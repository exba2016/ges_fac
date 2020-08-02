package cours.m2gl.jee.api.hospital.dao;

import cours.m2gl.jee.api.hospital.model.Paiement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaiementRepository extends JpaRepository<Paiement, Long> {
}
