package cours.m2gl.jee.api.hospital.service;

import cours.m2gl.jee.api.hospital.model.Medecin;

import java.util.List;

public interface IMedecinService {
    public Medecin save(Medecin medecin);
    public List<Medecin> findAll();
}
