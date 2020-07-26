package cours.m2gl.jee.api.hospital.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
@Data
@EqualsAndHashCode(exclude = {"medecins", "specialites"})
@Entity
public class Service implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(length = 30)
    private String libelle;

    @JsonIgnore
    @OneToMany(mappedBy = "service")
    private List<Medecin> medcins;

    @JsonIgnore
    @OneToMany(mappedBy = "service")
    private List<Specialite> specialites;

    public List<Medecin> getMedcins() {
        return medcins;
    }

    public void setMedcins(List<Medecin> medcins) {
        this.medcins = medcins;
    }

    public List<Specialite> getSpecialites() {
        return specialites;
    }

    public void setSpecialites(List<Specialite> specialites) {
        this.specialites = specialites;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLibelle() {
        return libelle;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    @Override
    public String toString() {
        return libelle;
    }
}
