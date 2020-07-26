package cours.m2gl.jee.api.hospital.controller;

import cours.m2gl.jee.api.hospital.dao.ServiceRepository;
import cours.m2gl.jee.api.hospital.dao.SpecialiteRepository;
import cours.m2gl.jee.api.hospital.model.Medecin;
import cours.m2gl.jee.api.hospital.model.Service;
import cours.m2gl.jee.api.hospital.model.Specialite;
import cours.m2gl.jee.api.hospital.service.IServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping(value = "/resource")
@CrossOrigin
public class RessourceController {
    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private SpecialiteRepository specialiteRepository;

    @GetMapping("/services")
    public @ResponseBody
    List<Service> findServices(){
        return serviceRepository.findAll();
    }

    @GetMapping("/specialites")
    public @ResponseBody
    List<Specialite> findSpecialitesBySErviceId(@RequestParam("serviceid") int ids){
        return specialiteRepository.findByService_Id(ids);
    }
}
