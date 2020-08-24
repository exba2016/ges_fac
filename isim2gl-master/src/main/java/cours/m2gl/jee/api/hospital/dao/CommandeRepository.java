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
    @Query("SELECT c FROM Commande c WHERE c.statuts<>?1 AND c.user.id=?2")
    public List<Commande> getAllCommandeOfClient(String s,Long id);
    @Query("SELECT c FROM Commande c WHERE c.statuts<>?1 AND c.isPayed=false")
    public List<Commande> getAllCommandeNotPayed(String s);
    public List<Commande> getAllByStatutsIsNotContainingAndUserId(String s,long id);
    public List<Commande> getAllByStatutsIsNotContainingAndCreatedAtIsGreaterThanEqual(String s, Date d);
    public List<Commande> getAllByStatutsIsNotContainingAndCreatedAtIsGreaterThanEqualAndUserId(String s, Date d,Long id);
    public List<Commande> getAllByStatutsIsNotContainingAndCreatedAtIsLessThanEqual(String s,Date d);
    public List<Commande> getAllByStatutsIsNotContainingAndCreatedAtIsLessThanEqualAndUserId(String s,Date d,Long id);
    public List<Commande> getAllByStatutsIsNotContainingAndCreatedAtIsGreaterThanEqualAndCreatedAtIsLessThanEqual(String s,Date d,Date f);
    public List<Commande> getAllByStatutsIsNotContainingAndCreatedAtIsGreaterThanEqualAndCreatedAtIsLessThanEqualAndUserId(String s,Date d,Date f,Long id);
    public Commande findByCode(String c);
    @Query("SELECT c FROM Commande c WHERE c.id=?1")
    public Commande findByIdCustom(Long id);
}
