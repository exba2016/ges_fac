package cours.m2gl.jee.api.hospital.service;

import cours.m2gl.jee.api.hospital.model.Paiement;

import java.util.List;

public interface IPaiementService {
    public Paiement save(Paiement paiement);
    public List<Paiement> findAll();
}
