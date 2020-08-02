package cours.m2gl.jee.api.hospital.dao;

import cours.m2gl.jee.api.hospital.model.Produit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProduitRepository extends JpaRepository<Produit, Long> {
}
