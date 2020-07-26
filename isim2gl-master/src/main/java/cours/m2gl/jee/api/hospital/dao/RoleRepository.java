package cours.m2gl.jee.api.hospital.dao;

import cours.m2gl.jee.api.hospital.model.Role;
import cours.m2gl.jee.api.hospital.model.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    public Role findByName(RoleName name);
}
