package cours.m2gl.jee.api.hospital.dao;

import cours.m2gl.jee.api.hospital.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    //Query("SELECT u FROM User u JOIN u.role r WHERE r.name =:name")
    public User findByUsernameAndStatutsIsNotContaining(String username,String s);


    public List<User>getAllByStatutsIsNotContaining(String s);

}
