package cours.m2gl.jee.api.hospital.service;

import cours.m2gl.jee.api.hospital.dao.SpecialiteRepository;
import cours.m2gl.jee.api.hospital.model.Specialite;
import org.springframework.beans.factory.annotation.Autowired;

@org.springframework.stereotype.Service
public class SpecialiteService implements ISpecialiteService {
    @Autowired
    private SpecialiteRepository specialiteRepository;
    @Override
    public Specialite findById(int id) {
        return specialiteRepository.getOne(id);
    }
}
