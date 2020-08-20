package cours.m2gl.jee.api.hospital.dao;

import cours.m2gl.jee.api.hospital.model.Paiement;
import cours.m2gl.jee.api.hospital.model.Produit;
import cours.m2gl.jee.api.hospital.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaiementRepository extends JpaRepository<Paiement, Long> {
    public List<Paiement> getAllByStatutsIsNotContaining(String s);
    @Query("SELECT p FROM Paiement p join p.commande c WHERE p.statuts<>?1 AND c.statuts<>?1 AND c.id=?2")
    public List<Paiement>getPaiementByCommande(String s,Long id);
    @Query("SELECT p FROM Paiement p JOIN p.commande c Join c.user u WHERE p.statuts<>?1 AND c.statuts<>?1  AND u.statuts<>?1 AND u.id=?2")
    public List<Paiement>getAllPaiementByClient(String s,Long id);
    public Paiement findByCode(String c);
    @Query("SELECT SUM(p.montantPaye) FROM Paiement p JOIN p.commande c WHERE  p.statuts<>?1 AND c.statuts<>?1  AND c.id=?2")
    public Double getSommePaiementForCommande(String s,Long id);
}
