import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { CommandeCreateUpdateComponent } from '../../modals/commande-create-update/commande-create-update.component';
import { SelectionType } from '@swimlane/ngx-datatable';
import { AlertService } from '../../services/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../services/login.service';
import { ModalConfirmDialogComponent } from '../../modals/modal-confirm-dialog/modal-confirm-dialog.component';
import {FactureCreateUpdateComponent} from '../../modals/facture-create-update/facture-create-update.component';

@Component({
  selector: 'app-gerer-commande',
  templateUrl: './gerer-commande.component.html',
  styleUrls: ['./gerer-commande.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GererCommandeComponent{

  @ViewChild('myTable', { static: true }) table: any;
  SelectionType = SelectionType;
  public columns: any;
  public rows: any;
  public temp = [];
  public selectedAnnee = null;
  public selectedMois = null;
  public filtreMois;
  public filtreAnnee;
  public dd: null;
  public df: null;
  public selected = [];
  public expanded: false;
  user;

  constructor(

    public alertService: AlertService,
    private modalService: NgbModal,
    public loginService: LoginService
  ) {

    this.getData();
  }


  create() {
    const modalRef = this.modalService.open(CommandeCreateUpdateComponent,{ size: 'xl' });
    modalRef.componentInstance.passEntry.subscribe((receivedData) => {
      console.log("after change password valide ", receivedData);
      let user={
        id:receivedData.commande.user
      };
      let lpc=[];

      lpc=receivedData.listProduitCommande;
      for(let pc of receivedData.listDelete){
        pc.statuts="supprimé";
        lpc.push(pc);
      }

      let c={
        dateLivraison:receivedData.commande.dateLivraison,
        adresseLivraison:receivedData.commande.adresseLivraison,
        user:user,
        produitCommandes:lpc
      };
      this.loginService.addCommande(c).subscribe((rss) => {
        if (rss) {
          console.log("After create commande ",rss);
          this.alertService.alert("Ajout éffectué avec succes !", "success");
          this.getFacture(rss.id);
          this.getData();
        } else {
          this.alertService.alert("Echec de l'ajout !", "warning");
        }
      }, er => {
        console.error(er);

      });

    });
  }
  getFacture(id){
    const modalRef = this.modalService.open(FactureCreateUpdateComponent,{ size: 'lg' });
    let produitCommande;
    let commande;
    this.loginService.getAllProduitCommandeByCommande(id).subscribe((rs)=>{
     produitCommande=rs;
      this.loginService.getCommande(id).subscribe((rss)=>{
        commande=rss;
        modalRef.componentInstance.commande=rss;
        modalRef.componentInstance.produitCommande=rs;
        modalRef.componentInstance.passEntry.subscribe((receivedData) => {
          console.log("after change select produit valide ", receivedData);
          commande.urlFactureGlobal=receivedData;
          commande.produitCommandes=rs;
          this.loginService.updateCommande(commande, commande.id).subscribe((rs) => {
            if (rs == true) {
              this.alertService.alert("Modification de la facture éffectué avec succes !", "success");
              this.getData();
            } else {
              this.alertService.alert("Echec de la modification de la facture!", "warning");
            }

          }, e => {
            console.error(e);

          });
        });
      });

    });


  }

  update(row = null) {
    console.log("row ", row);
    const modalRef = this.modalService.open(CommandeCreateUpdateComponent,{ size: 'xl' });
    modalRef.componentInstance.user = row;
    modalRef.componentInstance.passEntry.subscribe((receivedData) => {
      console.log("receiv ", receivedData);
      let user={
        id:receivedData.commande.user
      };
      let lpc=[];

      lpc=receivedData.listProduitCommande;
      for(let pc of receivedData.listDelete){
        pc.statuts="supprimé";
        lpc.push(pc);
      }

      let c={
        id:receivedData.id,
        dateLivraison:receivedData.commande.dateLivraison,
        adresseLivraison:receivedData.commande.adresseLivraison,
        user:user,
        produitCommandes:lpc
      };
      this.loginService.updateCommande(c, row.id).subscribe((rs) => {
        if (rs == true) {
          this.alertService.alert("Modification éffectué avec succes !", "success");
          this.getData();
        } else {
          this.alertService.alert("Echec de la modification !", "warning");
        }
        this.getFacture(row.id);

      }, e => {
        console.error(e);

      });
    });

  }
  delete(row = null) {
    const modalRef = this.modalService.open(ModalConfirmDialogComponent);
    modalRef.componentInstance.title = 'SUPPRESSION D\'UNE COMMANDE';
    modalRef.componentInstance.content = 'Etes-vous sur de vouloir supprimer cette commande [' + row.code + ']';
    modalRef.componentInstance.passEntry.subscribe(() => {
      this.loginService.deleteCommande(row.id)
        .subscribe(rs => {
          if (rs == true) {
            this.alertService.alert("Suppression éffectué avec succes !", "success");
            const pos = this.rows.indexOf(row);
            this.rows.splice(pos, 1);
            this.temp = this.rows;
            this.getData();
          } else {
            this.alertService.alert("Echec de la suppression !", "warning");
          }

        },
          err => {
            console.log(err);
          });
    });

  }
  getData() {
    let user:any = localStorage.getItem('user');
    user = JSON.parse(user);
    console.log("retrive force user ", user);
    this.user=user;
    this.loginService.getAllCommande().subscribe((res) => {
      console.log(res);
      this.rows = res;
      this.temp = this.rows;
    });

  }
  getFilterDataByDate() {
    if(this.dd || this.df){
      this.loginService.getAllCommandeByDate(this.dd,this.df).subscribe((rs)=>{
        console.log("by date ",rs.values);
        this.rows = rs;
        this.temp = this.rows;
      },err=>{
        console.error(err);

      });
    }else{
      this.getData();

    }


  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    if (!val) {
      this.getData();
    } else {
      val.trim();
    }
    // filter our data
    const temp = this.temp.filter(s => JSON.stringify(s).toLowerCase().includes(val));
    // update th rowse
    this.rows = temp;
  }

  onSelect(event) {

    //////console.log('Select Event', this.selected[this.selected.length-1]);
  }

  onActivate(event) {

    //////console.log('Activate Event', event);
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);


  }

  onDetailToggle(event) {

    //////console.log('Detail Toggled', event);
  }

}

