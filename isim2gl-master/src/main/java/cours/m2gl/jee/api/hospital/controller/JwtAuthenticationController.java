package cours.m2gl.jee.api.hospital.controller;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import cours.m2gl.jee.api.hospital.config.JwtTokenUtil;
import cours.m2gl.jee.api.hospital.dao.*;
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

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;
class CommandeModel implements Serializable {
    private Long id;
    private String code;
    private byte[] urlFactureGlobal;
    private String adresseLivraison;
    private double totalHT;
    private double totalTTC;
    private Date dateLivraison;
    private boolean isPayed;
    private String statuts;
    private Date createdAt;
    private Date updatedAt;
    private boolean isValide;
    private User user;
    private List<ProduitCommande>produitCommandes;
    private List<Paiement>paiements;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public byte[] getUrlFactureGlobal() {
        return urlFactureGlobal;
    }

    public void setUrlFactureGlobal(byte[] urlFactureGlobal) {
        this.urlFactureGlobal = urlFactureGlobal;
    }

    public String getAdresseLivraison() {
        return adresseLivraison;
    }

    public void setAdresseLivraison(String adresseLivraison) {
        this.adresseLivraison = adresseLivraison;
    }

    public double getTotalHT() {
        return totalHT;
    }

    public void setTotalHT(double totalHT) {
        this.totalHT = totalHT;
    }

    public double getTotalTTC() {
        return totalTTC;
    }

    public void setTotalTTC(double totalTTC) {
        this.totalTTC = totalTTC;
    }

    public Date getDateLivraison() {
        return dateLivraison;
    }

    public void setDateLivraison(Date dateLivraison) {
        this.dateLivraison = dateLivraison;
    }

    public boolean isPayed() {
        return isPayed;
    }

    public void setPayed(boolean payed) {
        isPayed = payed;
    }

    public String getStatuts() {
        return statuts;
    }

    public void setStatuts(String statuts) {
        this.statuts = statuts;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public boolean isValide() {
        return isValide;
    }

    public void setValide(boolean valide) {
        isValide = valide;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<ProduitCommande> getProduitCommandes() {
        return produitCommandes;
    }

    public void setProduitCommandes(List<ProduitCommande> produitCommandes) {
        this.produitCommandes = produitCommandes;
    }

    public List<Paiement> getPaiements() {
        return paiements;
    }

    public void setPaiements(List<Paiement> paiements) {
        this.paiements = paiements;
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
    @Autowired
    private CommandeRepository commandeRepository;
    @Autowired
    private ProduitCommandeRepository produitCommandeRepository;
    @Autowired
    private PaiementRepository paiementRepository;


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
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping("/users/client")
    public @ResponseBody
    List<User> findUserClient(){

        return userRepository.getAllClientNotHaveActiveCommande("supprimé",RoleName.ROLE_CLIENT);
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

    @PreAuthorize("hasAuthority('ROLE_CLIENT') or hasAuthority('ROLE_ADMIN')")
    @GetMapping("/users/ClientWithCommande")
    List<User> getAllClientWithCommande(){
        return userRepository.getAllClientWhoHaveActiveCommande("supprimé",RoleName.ROLE_CLIENT);
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

    //Commande
    @PreAuthorize("hasAuthority('ROLE_CLIENT') or hasAuthority('ROLE_ADMIN')")
    @GetMapping("/commandes")
    List<Commande> getAllCommandes(){
        return commandeRepository.getAllByStatutsIsNotContaining("supprimé");
    }

    @PreAuthorize("hasAuthority('ROLE_CLIENT') or hasAuthority('ROLE_ADMIN')")
    @GetMapping("/commandes/date")
    List<Commande> getAllCommandesByDate(@RequestParam("dd") String dd,@RequestParam("df") String df)
    {

        if((dd != null && !dd.isEmpty() && !dd.trim().isEmpty() && !dd.equals("undefined")) && (df != null && !df.isEmpty() && !df.trim().isEmpty() && !df.equals("undefined"))){
            Date date_d= Date.from(LocalDate.parse(dd).atStartOfDay(ZoneId.systemDefault()).toInstant());
            Date date_f= Date.from(LocalDate.parse(df).atStartOfDay(ZoneId.systemDefault()).toInstant());

            return commandeRepository.getAllByStatutsIsNotContainingAndCreatedAtIsGreaterThanEqualAndCreatedAtIsLessThanEqual("supprimé",date_d,date_f);
        }else if(dd != null && !dd.isEmpty() && !dd.trim().isEmpty() && !dd.equals("undefined")){
            Date date_d= Date.from(LocalDate.parse(dd).atStartOfDay(ZoneId.systemDefault()).toInstant());
            return commandeRepository.getAllByStatutsIsNotContainingAndCreatedAtIsGreaterThanEqual("supprimé",date_d);
        }else if(df != null && !df.isEmpty() && !df.trim().isEmpty() && !df.equals("undefined")){
            Date date_f= Date.from(LocalDate.parse(df).atStartOfDay(ZoneId.systemDefault()).toInstant());
            return commandeRepository.getAllByStatutsIsNotContainingAndCreatedAtIsLessThanEqual("supprimé",date_f);
        }
        System.out.println("allNull");
        return new ArrayList<Commande>();
    }


    @PreAuthorize("hasAuthority('ROLE_CLIENT') or hasAuthority('ROLE_ADMIN')")
    @PostMapping("/commandes/add")
    public @ResponseBody
    Commande addCommande(@RequestBody CommandeModel commande){
        Commande p=new Commande();
        Map<String,Double>totalHtTtc=getTotalHTAndTTC(commande.getProduitCommandes());
        p.setCode(generateCode("commande"));
        p.setAdresseLivraison(commande.getAdresseLivraison());
        p.setDateLivraison(commande.getDateLivraison());

        p.setPayed(false);
        p.setTotalHT(totalHtTtc.get("totalHT"));
        p.setTotalTTC(totalHtTtc.get("totalTTC"));
        p.setValide(false);
        p.setUser(commande.getUser());
        p.setCreatedAt(Date.from(Instant.now()));
        p.setUpdatedAt(Date.from(Instant.now()));
        p.setStatuts("active");

        try{
            commandeRepository.save(p);

            List<ProduitCommande>lp=new ArrayList<>();
            for(ProduitCommande pc:commande.getProduitCommandes()){
                ProduitCommande c=new ProduitCommande();
                c.setCommande(p);
                c.setProduit(pc.getProduit());
                c.setCreatedAt(Date.from(Instant.now()));
                c.setUpdatedAt(Date.from(Instant.now()));
                c.setDateLivraison(pc.getDateLivraison());
                p.setUrlFactureGlobal(commande.getUrlFactureGlobal());
                c.setProduit(pc.getProduit());
                c.setQte(pc.getQte());
                c.setPrix(pc.getPrix());
                c.setStatuts("active");
                produitCommandeRepository.save(c);
                Produit pr=produitRepository.findById(pc.getProduit().getId()).get();
                pr.setQte(pr.getQte()-pc.getQte());
                pr.setUpdatedAt(Date.from(Instant.now()));
                produitRepository.save(pr);

            }
            verifPaiementComplet(p.getId());
            return p;
        }catch (Exception ex){
            ex.printStackTrace();
            return new Commande();
        }
    }
    @PreAuthorize("hasAuthority('ROLE_CLIENT') or hasAuthority('ROLE_ADMIN')")
    @PutMapping("/commandes/update/{id}")
    public @ResponseBody
    boolean updateCommande(@RequestBody CommandeModel commande,@PathVariable Long id){
        Commande p=commandeRepository.findById(id).get();
        Map<String,Double>totalHtTtc=getTotalHTAndTTC(commande.getProduitCommandes());
        p.setAdresseLivraison(commande.getAdresseLivraison());
        p.setDateLivraison(commande.getDateLivraison());
        p.setTotalHT(totalHtTtc.get("totalHT"));
        p.setTotalTTC(totalHtTtc.get("totalTTC"));
        p.setUrlFactureGlobal(commande.getUrlFactureGlobal());
        p.setUser(commande.getUser());
        p.setUpdatedAt(Date.from(Instant.now()));
        try{
            commandeRepository.save(p);
            for(ProduitCommande pc:commande.getProduitCommandes()){
                System.out.println("testPc "+pc.getId()+" "+pc.getStatuts());
                if(pc.getId()==null ||pc.getId()==0){
                    ProduitCommande c=new ProduitCommande();
                    c.setCommande(p);
                    c.setProduit(pc.getProduit());
                    c.setCreatedAt(Date.from(Instant.now()));
                    c.setUpdatedAt(Date.from(Instant.now()));
                    c.setDateLivraison(pc.getDateLivraison());
                    c.setProduit(pc.getProduit());
                    c.setQte(pc.getQte());
                    c.setPrix(pc.getPrix());
                    c.setStatuts("active");
                    produitCommandeRepository.save(c);

                    Produit pr=produitRepository.findById(pc.getProduit().getId()).get();
                    pr.setQte(pr.getQte()-pc.getQte());
                    pr.setUpdatedAt(Date.from(Instant.now()));
                    produitRepository.save(pr);
                }else {
                    ProduitCommande oldPc = new ProduitCommande();
                    oldPc = produitCommandeRepository.findById(pc.getId()).get();

                    if (pc.getStatuts() != null && !pc.getStatuts().isEmpty() && pc.getStatuts() == "supprimé") {
                        pc.setUpdatedAt(Date.from(Instant.now()));
                        Produit pr = produitRepository.findById(pc.getProduit().getId()).get();
                        pr.setQte(pr.getQte() + oldPc.getQte());
                        pr.setUpdatedAt(Date.from(Instant.now()));
                        produitRepository.save(pr);
                        produitCommandeRepository.save(pc);
                    }
                    if (oldPc.getQte() > pc.getQte()) {
                        pc.setUpdatedAt(Date.from(Instant.now()));
                        Produit pr = produitRepository.findById(pc.getProduit().getId()).get();
                        pr.setQte(pr.getQte() + (oldPc.getQte() - pc.getQte()));
                        pr.setUpdatedAt(Date.from(Instant.now()));
                        produitRepository.save(pr);
                        produitCommandeRepository.save(pc);
                    } else if (oldPc.getQte() < pc.getQte()) {
                        pc.setUpdatedAt(Date.from(Instant.now()));
                        Produit pr = produitRepository.findById(pc.getProduit().getId()).get();
                        pr.setQte(pr.getQte() - (pc.getQte() - oldPc.getQte()));
                        pr.setUpdatedAt(Date.from(Instant.now()));
                        produitRepository.save(pr);
                        produitCommandeRepository.save(pc);
                    }
                }

            }
            verifPaiementComplet(p.getId());
            return true;
        }catch (Exception ex){
            ex.printStackTrace();
            return false;
        }
    }
    @PreAuthorize("hasAuthority('ROLE_CLIENT') or hasAuthority('ROLE_ADMIN')")
    @GetMapping("/commandes/delete")
    public @ResponseBody
    boolean deleteCommande(@RequestParam Long id){
        Commande u=commandeRepository.findById(id).get();
        u.setStatuts("supprimé");
        try{
            commandeRepository.save(u);
            return true;
        }catch (Exception ex){
            return false;
        }
    }
    @PreAuthorize("hasAuthority('ROLE_CLIENT') or hasAuthority('ROLE_ADMIN')")
    @GetMapping("/commandes/{id}")
    public @ResponseBody
    Commande getCommande(@PathVariable Long id){
        return commandeRepository.findById(id).get();
    }
    @PreAuthorize("hasAuthority('ROLE_CLIENT') or hasAuthority('ROLE_ADMIN')")
    @GetMapping("/commandes/produit")
    public @ResponseBody
    List<ProduitCommande> getAllProduitByCommande(@RequestParam Long id){
        return produitCommandeRepository.getAllByStatutsIsNotContainingAndCommandeId("supprimé",id);
    }

    public Map<String,Double> getTotalHTAndTTC(List<ProduitCommande>lp){
        Map<String,Double>totalHtTtc=new HashMap<>();
        double total=0,tva=0;
        for(ProduitCommande pc:lp){
            total+=pc.getPrix()*pc.getQte();
        }
        tva=total*0.18;
        totalHtTtc.put("totalHT",total);
        totalHtTtc.put("totalTTC",(total+tva));
        return totalHtTtc;
    }

    //Produit
    @PreAuthorize("hasAuthority('ROLE_CLIENT') or hasAuthority('ROLE_ADMIN')")
    @GetMapping("/paiements")
    List<Paiement> getAllPaiement(){
        return paiementRepository.getAllByStatutsIsNotContaining("supprimé");
    }

    @PreAuthorize("hasAuthority('ROLE_CLIENT') or hasAuthority('ROLE_ADMIN')")
    @GetMapping("/paiements/{id}")
    List<Paiement> getAllPaiement(@PathVariable Long id){
        return paiementRepository.getAllPaiementByClient("supprimé",id);
    }


    @PreAuthorize("hasAuthority('ROLE_CLIENT') or hasAuthority('ROLE_ADMIN')")
    @PostMapping("/paiements/add")
    public @ResponseBody
    boolean addPaiement(@RequestBody Paiement paiement){
        Paiement p=new Paiement();
        p.setCode(generateCode("paiement"));
        p.setCommande(paiement.getCommande());
        p.setMontantPaye(paiement.getMontantPaye());
        p.setUrlFacturePartielle(paiement.getUrlFacturePartielle());
        p.setStatuts("active");
        p.setCreatedAt(Date.from(Instant.now()));
        p.setUpdatedAt(Date.from(Instant.now()));
        p.setStatuts("active");
        try{
            paiementRepository.save(p);
            verifPaiementComplet(paiement.getCommande().getId());
            return true;
        }catch (Exception ex){
            ex.printStackTrace();
            return false;
        }
    }
    @PreAuthorize("hasAuthority('ROLE_CLIENT') or hasAuthority('ROLE_ADMIN')")
    @PutMapping("/paiements/update/{id}")
    public @ResponseBody
    boolean updatePaiement(@RequestBody Paiement pr,@PathVariable Long id){
        Paiement p=paiementRepository.findById(id).get();
        p.setMontantPaye(pr.getMontantPaye());
        p.setUpdatedAt(Date.from(Instant.now()));
        p.setUrlFacturePartielle(pr.getUrlFacturePartielle());
        try{
            paiementRepository.save(p);
            verifPaiementComplet(p.getCommande().getId());
            return true;
        }catch (Exception ex){
            ex.printStackTrace();
            return false;
        }
    }
    @PreAuthorize("hasAuthority('ROLE_CLIENT') or hasAuthority('ROLE_ADMIN')")
    @GetMapping("/paiements/delete")
    public @ResponseBody
    boolean deletePaiement(@RequestParam Long id){
        Paiement u=paiementRepository.findById(id).get();
        u.setStatuts("supprimé");
        try{
            paiementRepository.save(u);
            verifPaiementComplet(id);
            return true;
        }catch (Exception ex){
            return false;
        }
    }
    @PreAuthorize("hasAuthority('ROLE_CLIENT') or hasAuthority('ROLE_ADMIN')")
    @GetMapping("/paiements/somme/{id}")
    public @ResponseBody
    double getSommePaiementForCommande(@PathVariable Long id){
        return paiementRepository.getSommePaiementForCommande("supprimé",id);
    }
    public void verifPaiementComplet(Long id){
        double total=0;
        try{
            total=paiementRepository.getSommePaiementForCommande("supprimé",id);
        }catch (Exception e){

        }
        Commande c=commandeRepository.findById(id).get();

        if(c.getTotalTTC()==total && !c.isPayed()){
            c.setPayed(true);
            commandeRepository.save(c);
        }else{
            c.setPayed(false);
            commandeRepository.save(c);
        }
    }

    public String generateCode(String table){
        String code="";
        switch (table.toLowerCase()){
            case "produit":
                while(true){
                    code=""+(10000000 + (int)(Math.random() * ((20000000 - 10000000) + 1)));
                    if(produitRepository.findByCode(code)==null){
                        break;
                    }
                }
                break;
            case "commande":
                while(true){
                    code=""+(10000000 + (int)(Math.random() * ((20000000 - 10000000) + 1)));
                    if(commandeRepository.findByCode(code)==null){
                        break;
                    }
                }
                break;
            case "paiement":
                while(true){
                    code=""+(10000000 + (int)(Math.random() * ((20000000 - 10000000) + 1)));
                    if(paiementRepository.findByCode(code)==null){
                        break;
                    }
                }
                break;
        }
        return code;
    }

}
