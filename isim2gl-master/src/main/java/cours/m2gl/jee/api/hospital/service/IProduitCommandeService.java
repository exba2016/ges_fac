package cours.m2gl.jee.api.hospital.service;

import cours.m2gl.jee.api.hospital.model.ProduitCommande;

import java.util.List;

public interface IProduitCommandeService {
    public ProduitCommande save(ProduitCommande produitCommande);
    public List<ProduitCommande> findAll();
}
