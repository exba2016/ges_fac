import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../services/login.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-select-produit-commande',
  templateUrl: './select-produit-commande.component.html',
  styleUrls: ['./select-produit-commande.component.scss']
})
export class SelectProduitCommandeComponent implements OnInit {

  @Input() public externalProduit;
  selectedProduit;
  valider: boolean;
  @Output() public passEntry = new EventEmitter<any>();
  form: FormGroup;
  constructor(public alertService: AlertService, public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private loginService: LoginService) { }
  produits = [];
  ngOnInit(): void {
    this.valider = false;
    this.form = this.formBuilder.group({

      produit: ['', Validators.required],
      prix: ['', Validators.required],
      dateLivraison: ['', Validators.required],
      qte: ['', Validators.required]
    });

    this.loginService.getAllProduit().subscribe((rs) => {
      this.produits = rs;
    }, error => {
      console.error(error);

    });
    if (this.externalProduit) {
      this.form.patchValue({
        produit: this.externalProduit.produit.id,
        prix: this.externalProduit.prix,
        dateLivraison: this.externalProduit.dateLivraison,
        qte: this.externalProduit.qte
      });
    }

  }

  verifPrix() {
    if (this.form.value.produit) {
      let p = this.produits.filter(r => r.id == this.form.value.produit)[0];
      if (p && this.form.value.prix < p.prixMin) {
        this.alertService.alert("Le prix saisi est inférrieur au prix minimal ! Veuillez entrer une nouveau prix.", "warning");
        this.form.patchValue({
          prix: 0
        })
      }
    }

  }
  verifQte() {
    if (this.form.value.produit) {
      let p = this.produits.filter(r => r.id == this.form.value.produit)[0];
      if (p && this.form.value.qte > (p.qte+((this.externalProduit)?this.externalProduit.qte:0))) {
        this.alertService.alert("La quantité saisi est suppérieur a la quantité restant ! Veuillez entrer une nouvelle quantité.", "warning");
        this.form.patchValue({
          qte: 0
        })
      }
    }
  }

  get f() { return this.form.controls; }


  onSubmit() {
    this.valider = true;

    if (this.form.invalid) {
      return;
    }

    let p = this.produits.filter(r => r.id == this.form.value.produit)[0];
    if (p && this.form.value.prix < p.prixMin) {
      this.alertService.alert("Le prix saisi est inférrieur au prix minimal ! Veuillez entrer une nouveau prix.", "warning");
      this.form.patchValue({
        prix: 0
      });
      return;
    }
    if (p && this.form.value.qte > (p.qte+((this.externalProduit)?this.externalProduit.qte:0))) {
      this.alertService.alert("La quantité saisi est suppérieur a la quantité restant ! Veuillez entrer une nouvelle quantité.", "warning");
      this.form.patchValue({
        qte: 0
      });
      return;
    }
    let produitCommande:any={
      prix:this.form.value.prix,
      qte:this.form.value.qte,
      dateLivraison:this.form.value.dateLivraison,
      produit:p
    };


    this.passEntry.emit(produitCommande);
    this.activeModal.close();
  }

}


