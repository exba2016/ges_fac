package cours.m2gl.jee.api.hospital.service;

import cours.m2gl.jee.api.hospital.model.Commande;
import cours.m2gl.jee.api.hospital.model.Commande;

import java.util.List;

public interface ICommandeService {
    public Commande save(Commande commande);
    public List<Commande> findAll();
}
