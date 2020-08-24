package cours.m2gl.jee.api.hospital.dao;

import cours.m2gl.jee.api.hospital.model.ProduitCommande;
import javafx.util.Pair;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import sun.java2d.marlin.stats.Histogram;

import javax.persistence.Tuple;
import javax.persistence.TupleElement;
import java.util.List;

@Repository
public interface ProduitCommandeRepository extends JpaRepository<ProduitCommande, Long> {
    public List<ProduitCommande>getAllByStatutsIsNotContainingAndCommandeId(String s,Long i);
    @Query("SELECT DISTINCT(function('date_format',pr.createdAt,'%Y') ) FROM ProduitCommande pr WHERE pr.statuts<>?1")
    public List<Integer>getAllAnnee(String s);

    @Query("SELECT pr from ProduitCommande pr where pr.statuts<>?1 AND function('date_format',pr.createdAt,'%Y')=?2 ")
    public List<ProduitCommande>getStatsVenteByAnnee(String s, String a);

    @Query("SELECT pr from ProduitCommande pr where pr.statuts<>?1 AND function('date_format',pr.createdAt,'%Y')=?2")
    public List<ProduitCommande> getStatsVenteClientByAnnee(String s, String a);
}
