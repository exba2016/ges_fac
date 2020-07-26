package cours.m2gl.jee.api.hospital.service;

import cours.m2gl.jee.api.hospital.dao.MedecinRepository;
import cours.m2gl.jee.api.hospital.model.Medecin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedecinService implements IMedecinService {
    @Autowired
    private MedecinRepository medecinRepository;
    @Override
    public Medecin save(Medecin medecin) {
        return medecinRepository.save(medecin);
    }

    @Override
    public List<Medecin> findAll() {
        return medecinRepository.findAll();
    }
}
