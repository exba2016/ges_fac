import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SelectionType } from '@swimlane/ngx-datatable';
import { AlertService } from '../../services/alert.service';
import { LoginService } from '../../services/login.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserCreateUpdateComponent } from '../../modals/user-create-update/user-create-update.component';
import { ModalConfirmDialogComponent } from '../../modals/modal-confirm-dialog/modal-confirm-dialog.component';

@Component({
  selector: 'app-gerer-utilisateur',
  templateUrl: './gerer-utilisateur.component.html',
  styleUrls: ['./gerer-utilisateur.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GererUtilisateurComponent {

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

  constructor(

    public alertService: AlertService,
    private modalService: NgbModal,
    public loginService: LoginService
  ) {
    this.getData();
  }


  create() {
    const modalRef = this.modalService.open(UserCreateUpdateComponent);
    modalRef.componentInstance.passEntry.subscribe((receivedData) => {
      console.log("after change password valide ", receivedData);
      this.loginService.findUser(receivedData.email).subscribe((rs) => {
        if (rs && rs.username) {
          //Cet email est déjà attribuer
          this.alertService.alert("Cette adresse email est déjà attribuer, veuillez recommencer !", "warning");
        } else {
          this.loginService.addUser(receivedData).subscribe((rss) => {
            if (rss == true) {
              this.alertService.alert("Ajout éffectué avec succes !", "success");
              this.getData();
            } else {
              this.alertService.alert("Echec de l'ajout !", "warning");
            }
          }, er => {
            console.error(er);

          });
        }
      }, e => {
        console.error(e);

      });
    });
  }

  update(row = null) {
    console.log("row ", row);
    const modalRef = this.modalService.open(UserCreateUpdateComponent);
    modalRef.componentInstance.user = row;
    modalRef.componentInstance.passEntry.subscribe((receivedData) => {
      console.log("receiv ", receivedData);
      this.loginService.updateUser(receivedData, row.id).subscribe((rs) => {
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
    modalRef.componentInstance.title = 'SUPPRESSION D\'UN UTILISATEUR';
    modalRef.componentInstance.content = 'Etes-vous sur de vouloir supprimer cet utilisateur [' + row.username + ']';
    modalRef.componentInstance.passEntry.subscribe(() => {
      this.loginService.deleteUser(row.id)
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
    this.loginService.getAllUser().subscribe((res) => {
      //////console.log(res.values);
      this.rows = res;
      this.temp = this.rows;
    });

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

