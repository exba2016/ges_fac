package cours.m2gl.jee.api.hospital.dao;

import cours.m2gl.jee.api.hospital.model.Produit;
import cours.m2gl.jee.api.hospital.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProduitRepository extends JpaRepository<Produit, Long> {
    public List<Produit> getAllByStatutsIsNotContaining(String s);
    public List<Produit> getAllByStatutsIsNotContainingAndQteIsGreaterThan(String s,Double qte);
    public Produit findByCode(String c);
}
