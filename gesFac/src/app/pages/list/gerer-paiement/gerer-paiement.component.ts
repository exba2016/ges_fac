import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AlertService} from '../../services/alert.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoginService} from '../../services/login.service';
import {ProduitCreateUpdateComponent} from '../../modals/produit-create-update/produit-create-update.component';
import {ModalConfirmDialogComponent} from '../../modals/modal-confirm-dialog/modal-confirm-dialog.component';
import {PaiementCreateUpdateComponent} from '../../modals/paiement-create-update/paiement-create-update.component';
import {GlobalService} from '../../services/global.service';
import { SelectionType } from '@swimlane/ngx-datatable';
import {FactureCreateUpdateComponent} from '../../modals/facture-create-update/facture-create-update.component';

@Component({
  selector: 'app-gerer-paiement',
  templateUrl: './gerer-paiement.component.html',
  styleUrls: ['./gerer-paiement.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GererPaiementComponent {

  @ViewChild('myTable', { static: true }) table: any;
  SelectionType = SelectionType;
  public columns: any;
  public rows: any;
  public client:any;
  public clients=[];
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
    public globalService:GlobalService,
    public loginService: LoginService
  ) {
    this.getData();
    this.loginService.getAllClientWithActiveCommande().subscribe((rs)=>{
      this.clients=rs;
    });
  }



  create() {
    const modalRef = this.modalService.open(PaiementCreateUpdateComponent);
    modalRef.componentInstance.passEntry.subscribe((receivedData) => {
      console.log("after change password valide ", receivedData);
      this.loginService.addPaiement(receivedData).subscribe((rss) => {
        if (rss == true) {
          this.alertService.alert("Ajout éffectué avec succes !", "success");
          this.getData();
        } else {
          this.alertService.alert("Echec de l'ajout !", "warning");
        }
      }, er => {
        console.error(er);

      });

    });
  }

  update(row = null) {
    console.log("row ", row);
    const modalRef = this.modalService.open(PaiementCreateUpdateComponent);
    modalRef.componentInstance.user = row;
    modalRef.componentInstance.passEntry.subscribe((receivedData) => {
      console.log("receiv ", receivedData);
      this.loginService.updatePaiement(receivedData, row.id).subscribe((rs) => {
        if (rs == true) {
          this.alertService.alert("Modification éffectué avec succes !", "success");
          this.getData();
        } else {
          this.alertService.alert("Echec de la modification !", "warning");
        }

      }, e => {
        console.error(e);

      });
    })

  }
  delete(row = null) {
    const modalRef = this.modalService.open(ModalConfirmDialogComponent);
    modalRef.componentInstance.title = 'SUPPRESSION D\'UN PAIEMENT';
    modalRef.componentInstance.content = 'Etes-vous sur de vouloir supprimer ce paiement [' + row.code + ']';
    modalRef.componentInstance.passEntry.subscribe(() => {
      this.loginService.deletePaiement(row.id)
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
  getDataForClient(){
    this.loginService.getAllPaiementOfClient(this.client.id).subscribe((res) => {
      console.log(res.values);
      this.rows = res;
      this.temp = this.rows;
    });
  }
  getData() {
    let user:any = localStorage.getItem('user');
    user = JSON.parse(user);
    console.log("retrive force user ", user);
    this.user=user;
    if(user.role.name==='ROLE_ADMIN'){
      this.loginService.getAllPaiement().subscribe((res) => {
        console.log(res.values);
        this.rows = res;
        this.temp = this.rows;
      });
    }else{
      this.loginService.getAllPaiementOfClient(user.id).subscribe((res) => {
        console.log(res.values);
        this.rows = res;
        this.temp = this.rows;
      });
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
