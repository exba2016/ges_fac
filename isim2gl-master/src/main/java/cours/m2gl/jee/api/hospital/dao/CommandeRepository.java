package cours.m2gl.jee.api.hospital.dao;

import cours.m2gl.jee.api.hospital.model.Commande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommandeRepository extends JpaRepository<Commande, Long> {
}
