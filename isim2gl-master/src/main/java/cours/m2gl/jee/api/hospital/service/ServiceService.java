package cours.m2gl.jee.api.hospital.service;

import cours.m2gl.jee.api.hospital.dao.ServiceRepository;
import cours.m2gl.jee.api.hospital.model.Service;
import org.springframework.beans.factory.annotation.Autowired;

@org.springframework.stereotype.Service
public class ServiceService implements IServiceService {
    @Autowired
    private ServiceRepository serviceRepository;
    @Override
    public Service findById(int id) {
        return serviceRepository.getOne(id);
    }
}
