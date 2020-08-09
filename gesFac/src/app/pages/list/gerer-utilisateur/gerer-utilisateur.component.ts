import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SelectionType } from '@swimlane/ngx-datatable';
import { AlertService } from '../../services/alert.service';
import { LoginService } from '../../services/login.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserCreateUpdateComponent } from '../../modals/user-create-update/user-create-update.component';

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


  create(){
    const modalRef = this.modalService.open(UserCreateUpdateComponent);
              modalRef.componentInstance.passEntry.subscribe((receivedData) => {
                console.log("after change password valide ", receivedData);

              });
  }

  update(row = null){
    if (row) {
      this.selected=[row];
    }
  }
  delete(row = null){
    if (row) {
      this.selected=[row];
    }
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

