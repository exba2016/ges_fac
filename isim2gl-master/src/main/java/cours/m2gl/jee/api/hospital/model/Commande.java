package cours.m2gl.jee.api.hospital.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "commande", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "code"
        })
})
public class Commande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(min=3, max = 30)
    private String code;

    @NotBlank
    private String urlFactureGlobal;

    private double totalHT;

    private double totalTTC;

    private Date dateLivraison;

    private boolean isPayed;


    @Size(min=4, max = 30)
    private String statuts;
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    @JsonIgnoreProperties("commande")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @JsonIgnoreProperties("commande")
    @OneToMany(mappedBy = "commande")
    private List<ProduitCommande>produitCommandes;

    @JsonIgnoreProperties("commande")
    @OneToMany(mappedBy = "commande")
    private List<Paiement>paiements;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getUrlFactureGlobal() {
        return urlFactureGlobal;
    }

    public void setUrlFactureGlobal(String urlFactureGlobal) {
        this.urlFactureGlobal = urlFactureGlobal;
    }

    public double getTotalHT() {
        return totalHT;
    }

    public void setTotalHT(double totalHT) {
        this.totalHT = totalHT;
    }

    public double getTotalTTC() {
        return totalTTC;
    }

    public void setTotalTTC(double totalTTC) {
        this.totalTTC = totalTTC;
    }

    public Date getDateLivraison() {
        return dateLivraison;
    }

    public void setDateLivraison(Date dateLivraison) {
        this.dateLivraison = dateLivraison;
    }

    public boolean isPayed() {
        return isPayed;
    }

    public void setPayed(boolean payed) {
        isPayed = payed;
    }

    public String getStatuts() {
        return statuts;
    }

    public void setStatuts(String statuts) {
        this.statuts = statuts;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<ProduitCommande> getProduitCommandes() {
        return produitCommandes;
    }

    public void setProduitCommandes(List<ProduitCommande> produitCommandes) {
        this.produitCommandes = produitCommandes;
    }

    public List<Paiement> getPaiements() {
        return paiements;
    }

    public void setPaiements(List<Paiement> paiements) {
        this.paiements = paiements;
    }
}
