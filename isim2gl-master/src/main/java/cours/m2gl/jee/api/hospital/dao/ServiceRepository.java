package cours.m2gl.jee.api.hospital.dao;

import cours.m2gl.jee.api.hospital.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Integer> {

}
