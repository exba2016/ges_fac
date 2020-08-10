package cours.m2gl.jee.api.hospital.controller;

import cours.m2gl.jee.api.hospital.config.JwtTokenUtil;
import cours.m2gl.jee.api.hospital.dao.ProduitRepository;
import cours.m2gl.jee.api.hospital.dao.RoleRepository;
import cours.m2gl.jee.api.hospital.dao.UserRepository;
import cours.m2gl.jee.api.hospital.model.*;
import cours.m2gl.jee.api.hospital.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
class ProduitModel{
    private String libelle;
    private double qte;
    private double prix;
    private double prixMin;

    public String getLibelle() {
        return libelle;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public double getQte() {
        return qte;
    }

    public void setQte(double qte) {
        this.qte = qte;
    }

    public double getPrix() {
        return prix;
    }

    public void setPrix(double prix) {
        this.prix = prix;
    }

    public double getPrixMin() {
        return prixMin;
    }

    public void setPrixMin(double prixMin) {
        this.prixMin = prixMin;
    }
}
class UserModel{
    private String nom;
    private String telephone;
    private String adresse;
    private Long role;
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public Long getRole() {
        return role;
    }

    public void setRole(Long role) {
        this.role = role;
    }
}
@RestController
@CrossOrigin
public class JwtAuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private ProduitRepository produitRepository;


    @PreAuthorize("hasAuthority('ROLE_CLIENT') or hasAuthority('ROLE_ADMIN')")
    @RequestMapping(value = "/roles", method = RequestMethod.GET, consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE })
    public List<String> getUserRoles(@RequestParam("username") String username) throws Exception {
        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(username);

        return userDetails.getAuthorities().stream()
                .map(u->((GrantedAuthority) u)
                        .getAuthority()).collect(Collectors.toList());
    }

    @PreAuthorize("hasAuthority('ROLE_CLIENT') or hasAuthority('ROLE_ADMIN')")
    @GetMapping("/listRoles")
    List<Role> getListRoles(){
        return roleRepository.findAll();
    }
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody JwtRequest authenticationRequest) {

        System.out.println(authenticationRequest.getUsername()+" - "+authenticationRequest.getPassword());
        final UserDetails details = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());
        Authentication authentication = null;
        try {
            authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = jwtTokenUtil.generateToken(details);
            System.out.println(jwt);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            if(userDetails != null){
                return ResponseEntity.ok(new ResponseJwt(jwt, userDetails.getUsername(), userDetails.getAuthorities()));
            }

            return ResponseEntity.ok(new ErrorResponse("INVALID_CREDENTIALS"));
        } catch (DisabledException e) {
            return ResponseEntity.ok(new ErrorResponse("USER_DISABLED"));
        } catch (BadCredentialsException e) {
            return ResponseEntity.ok(new ErrorResponse("INVALID_CREDENTIALS"));
        }

    }
    @PreAuthorize("hasAuthority('ROLE_CLIENT') or hasAuthority('ROLE_ADMIN')")
    @PostMapping("/users")
    public @ResponseBody
    User findUser(@RequestBody String username){
        return userRepository.findByUsernameAndStatutsIsNotContaining(username,"supprimé");
    }
    @PreAuthorize("hasAuthority('ROLE_CLIENT') or hasAuthority('ROLE_ADMIN')")
    @PutMapping("/encodePassword/{id}")
    boolean encodePassword(@RequestBody String password, @PathVariable Long id){
        System.out.println("pass "+password);
        return new BCryptPasswordEncoder().matches(password,userRepository.findById(id).get().getPassword());
    }
    @PreAuthorize("hasAuthority('ROLE_CLIENT') or hasAuthority('ROLE_ADMIN')")
    @PostMapping("/users/add")
    public @ResponseBody
    boolean addUser(@RequestBody UserModel user){
        User u=new User();
        u.setStatuts("not_active");
        u.setPassword(new BCryptPasswordEncoder().encode("passer"));
        u.setAdresse(user.getAdresse());
        u.setCreatedAt(Date.from(Instant.now()));
        u.setUpdatedAt(Date.from(Instant.now()));
        u.setEmail(user.getEmail());
        u.setNom(user.getNom());
        u.setTelephone(user.getTelephone());
        u.setUsername(u.getEmail());
        u.setRole(roleRepository.findById(user.getRole()).get());

        try{
            userRepository.save(u);
            return true;
        }catch (Exception ex){
            return false;
        }
    }
    @PreAuthorize("hasAuthority('ROLE_CLIENT') or hasAuthority('ROLE_ADMIN')")
    @PutMapping("/users/update/{id}")
    public @ResponseBody
    boolean updateUser(@RequestBody UserModel user,@PathVariable Long id){
        User u=userRepository.findById(id).get();
        u.setAdresse(user.getAdresse());
        u.setUpdatedAt(Date.from(Instant.now()));
        u.setEmail(user.getEmail());
        u.setNom(user.getNom());
        u.setTelephone(user.getTelephone());
        u.setUsername(u.getEmail());
        u.setRole(roleRepository.findById(user.getRole()).get());

        try{
            userRepository.save(u);
            return true;
        }catch (Exception ex){
            return false;
        }
    }
    @PreAuthorize("hasAuthority('ROLE_CLIENT') or hasAuthority('ROLE_ADMIN')")
    @GetMapping("/users/delete")
    public @ResponseBody
    boolean deleteUser(@RequestParam Long id){
        User u=userRepository.findById(id).get();
        u.setStatuts("supprimé");
        try{
            userRepository.save(u);
            return true;
        }catch (Exception ex){
            return false;
        }
    }


    @PreAuthorize("hasAuthority('ROLE_CLIENT') or hasAuthority('ROLE_ADMIN')")
    @PutMapping("/changePassword/{id}")
    User changeUserPassword(@RequestBody String password, @PathVariable Long id) {
        System.out.println("password "+password);
        return userRepository
                .findById(id)
                .map(u -> {
                    u.setPassword(new BCryptPasswordEncoder().encode(password));
                    u.setStatuts("active");
                    return userRepository.save(u);
                }).get();
    }

    @PreAuthorize("hasAuthority('ROLE_CLIENT') or hasAuthority('ROLE_ADMIN')")
    @GetMapping("/users")
    List<User> getAllUser(){
        return userRepository.getAllByStatutsIsNotContaining("supprimé");
    }

    //Produit
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping("/produits")
    List<Produit> getAllProduits(){
        return produitRepository.getAllByStatutsIsNotContaining("supprimé");
    }


    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/produits/add")
    public @ResponseBody
    boolean addProduit(@RequestBody Produit produit){
        Produit p=new Produit();
        p.setCode(generateCode("produit"));
        p.setQte(produit.getQte());
        p.setPrixMin(produit.getPrixMin());
        p.setLibelle(produit.getLibelle());
        p.setPrix(produit.getPrix());
        p.setCreatedAt(Date.from(Instant.now()));
        p.setUpdatedAt(Date.from(Instant.now()));
        p.setStatuts("active");
        try{
            produitRepository.save(p);
            return true;
        }catch (Exception ex){
            ex.printStackTrace();
            return false;
        }
    }
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PutMapping("/produits/update/{id}")
    public @ResponseBody
    boolean updateProduit(@RequestBody Produit pr,@PathVariable Long id){
        Produit p=produitRepository.findById(id).get();
        p.setLibelle(pr.getLibelle());
        p.setUpdatedAt(Date.from(Instant.now()));
        p.setPrix(pr.getPrix());
        p.setPrixMin(pr.getPrixMin());
        p.setQte(pr.getQte());
        try{
            produitRepository.save(p);
            return true;
        }catch (Exception ex){
            return false;
        }
    }
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping("/produits/delete")
    public @ResponseBody
    boolean deleteProduit(@RequestParam Long id){
        Produit u=produitRepository.findById(id).get();
        u.setStatuts("supprimé");
        try{
            produitRepository.save(u);
            return true;
        }catch (Exception ex){
            return false;
        }
    }

    public String generateCode(String table){
        String code="";
        switch (table.toLowerCase()){
            case "produit":
                while(true){
                    code=""+(100000 + (int)(Math.random() * ((200000 - 100000) + 1)));
                    if(produitRepository.findByCode(code)==null){
                        break;
                    }
                }
                break;
        }
        return code;
    }

}
