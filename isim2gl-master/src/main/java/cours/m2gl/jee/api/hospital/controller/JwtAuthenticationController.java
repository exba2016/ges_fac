package cours.m2gl.jee.api.hospital.controller;

import cours.m2gl.jee.api.hospital.config.JwtTokenUtil;
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
        return userRepository.findAllByUsernameOrEmail(username);
    }
    @PreAuthorize("hasAuthority('ROLE_CLIENT') or hasAuthority('ROLE_ADMIN')")
    @PutMapping("/encodePassword/{id}")
    boolean encodePassword(@RequestBody String password, @PathVariable Long id){
        System.out.println("pass "+password);
        return new BCryptPasswordEncoder().matches(password,userRepository.findById(id).get().getPassword());
    }
    @PreAuthorize("hasAuthority('ROLE_CLIENT') or hasAuthority('ROLE_ADMIN')")
    @PostMapping("/users")
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
        return userRepository.findAll();
    }

}
