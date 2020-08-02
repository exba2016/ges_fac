package cours.m2gl.jee.api.hospital.service;

import cours.m2gl.jee.api.hospital.model.Produit;

import java.util.List;

public interface IProduitService {
    public Produit save(Produit produit);
    public List<Produit> findAll();
}
