import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoginService} from '../../services/login.service';
import {AlertService} from '../../services/alert.service';
import {SelectProduitCommandeComponent} from '../select-produit-commande/select-produit-commande.component';
import {FactureCreateUpdateComponent} from '../facture-create-update/facture-create-update.component';

@Component({
  selector: 'app-paiement-create-update',
  templateUrl: './paiement-create-update.component.html',
  styleUrls: ['./paiement-create-update.component.scss']
})
export class PaiementCreateUpdateComponent implements OnInit {
  commande;
  @Input() public user;
  montantRestant;
  valider: boolean;
  @Output() public passEntry = new EventEmitter<any>();
  form: FormGroup;
  constructor(public activeModal: NgbActiveModal,public alertService:AlertService,private modalService: NgbModal, private formBuilder: FormBuilder,private loginService:LoginService) {

  }
  commandes=[];

  ngOnInit(): void {
    this.valider = false;
    this.form = this.formBuilder.group({

      montantPaye:['', Validators.required],
      commande:['',Validators.required]
    });
    this.loginService.getAllCommande().subscribe((rs)=>{
      this.commandes=rs;
    },error=>{
      console.error(error);

    });

    console.log("paiement ",this.user);
    if(this.user){
      this.form.patchValue({
        montantPaye:this.user.montantPaye,
        commande:this.user.commande.id
      });

    }
    this.calculeMontant();

  }
  calculeMontant(){
      let p = this.commandes.filter(r => r.id == this.form.value.commande)[0];
      this.loginService.getSommePaiementOfCommande(p.id).subscribe((rs)=>{
       this.montantRestant=(p.totalTTC-rs);
      });

  }

  verifPrix() {
    if (this.form.value.commande) {
      this.calculeMontant();
      console.log(this.form.value);
      let p = this.commandes.filter(r => r.id == this.form.value.commande)[0];
      this.loginService.getSommePaiementOfCommande(p.id).subscribe((rs)=>{
        if (p && (this.form.value.montantPaye-rs) > (p.totalTTC-rs)) {
          this.alertService.alert("Le montant saisi est supérrieur au montant restant a payé pour cette commande. Il vous reste a payé "+rs+" FCFA !", "warning");
          this.form.patchValue({
            montantPaye: 0
          })
        }
      });


    }

  }

  get f() { return this.form.controls; }


  onSubmit(){

    this.valider = true;

    if(this.form.invalid){
      return;
    }
    let p;
    p = this.commandes.filter(r => r.id == this.form.value.commande)[0];
    let ok=this.loginService.getSommePaiementOfCommande(p.id).subscribe((rs)=> {
      if ((this.form.value.montantPaye-rs) > (p.totalTTC-rs)) {
        this.alertService.alert("Le montant saisi est supérrieur au montant restant a payé pour cette commande. Il vous reste a payé " + rs + " FCFA !", "warning");
        this.form.patchValue({
          montantPaye: 0
        });
        return false;
      }else{
        return true;
      }
    });
    if(!ok){
      return ;
    }

    let c={
      montantPaye:this.form.value.montantPaye,
      commande:{id:this.form.value.commande}
    };


    this.passEntry.emit(c);
    this.activeModal.close();
  }

}
