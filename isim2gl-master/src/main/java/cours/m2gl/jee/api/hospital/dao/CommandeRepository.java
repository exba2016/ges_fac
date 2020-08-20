package cours.m2gl.jee.api.hospital.dao;

import cours.m2gl.jee.api.hospital.model.Commande;
import cours.m2gl.jee.api.hospital.model.Produit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface CommandeRepository extends JpaRepository<Commande, Long> {
    public List<Commande> getAllByStatutsIsNotContaining(String s);
    public List<Commande> getAllByStatutsIsNotContainingAndCreatedAtIsGreaterThanEqual(String s, Date d);
    public List<Commande> getAllByStatutsIsNotContainingAndCreatedAtIsLessThanEqual(String s,Date d);
    public List<Commande> getAllByStatutsIsNotContainingAndCreatedAtIsGreaterThanEqualAndCreatedAtIsLessThanEqual(String s,Date d,Date f);
    public Commande findByCode(String c);
    @Query("SELECT c FROM Commande c WHERE c.id=?1")
    public Commande findByIdCustom(Long id);
}
