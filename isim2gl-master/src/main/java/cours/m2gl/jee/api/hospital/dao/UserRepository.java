package cours.m2gl.jee.api.hospital.dao;

import cours.m2gl.jee.api.hospital.model.RoleName;
import cours.m2gl.jee.api.hospital.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    //Query("SELECT u FROM User u JOIN u.role r WHERE r.name =:name")
    public User findByUsernameAndStatutsIsNotContaining(String username,String s);


    public List<User>getAllByStatutsIsNotContaining(String s);

    @Query("SELECT u FROM User u JOIN u.role r WHERE u.statuts<>?1 AND u.role.name =?2 AND not exists (SELECT c FROM Commande c WHERE c.statuts<>?1 AND c.user=u AND c.isPayed=false )")
    List<User>getAllClientNotHaveActiveCommande(String s, RoleName r);
    @Query("SELECT u FROM User u JOIN u.role r WHERE u.statuts<>?1 AND u.role.name =?2 AND exists (SELECT c FROM Commande c WHERE c.statuts<>?1 AND c.user=u AND c.isPayed=false )")
    List<User>getAllClientWhoHaveActiveCommande(String s, RoleName r);

}
