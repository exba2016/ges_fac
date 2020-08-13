package cours.m2gl.jee.api.hospital.dao;

import cours.m2gl.jee.api.hospital.model.ProduitCommande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProduitCommandeRepository extends JpaRepository<ProduitCommande, Long> {
    public List<ProduitCommande>getAllByStatutsIsNotContainingAndCommandeId(String s,Long i);
}
