import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../services/login.service';
import { SelectProduitCommandeComponent } from '../select-produit-commande/select-produit-commande.component';
import { SelectionType } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-commande-create-update',
  templateUrl: './commande-create-update.component.html',
  styleUrls: ['./commande-create-update.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CommandeCreateUpdateComponent implements OnInit {
  @ViewChild('commande', { static: true }) table: any;
  SelectionType = SelectionType;
  @Input() public user;

  valider: boolean;
  @Output() public passEntry = new EventEmitter<any>();
  form: FormGroup;
  listDelete=[];
  constructor(public activeModal: NgbActiveModal,private modalService: NgbModal, private formBuilder: FormBuilder,private loginService:LoginService) { }
  clients=[];
  public columns: any;
  public rows=[];
  public temp = [];
  public selectedAnnee = null;
  public selectedMois = null;
  public filtreMois;
  public filtreAnnee;
  public dd: null;
  public df: null;
  public selected = [];
  public expanded: false;


  ngOnInit(): void {
    this.valider = false;
    this.form = this.formBuilder.group({

      dateLivraison:['', Validators.required],
      adresseLivraison:['', Validators.required],
      user:['',Validators.required]
    });

    this.loginService.getAllClient().subscribe((rs)=>{
      this.clients=rs;
    },error=>{
      console.error(error);

    });
    if(this.user){
      this.form.patchValue({
        dateLivraison:this.user.dateLivraison,
        adresseLivraison:this.user.adresseLivraison,
        user:this.user.user.id
      });
      this.loginService.getAllProduitCommandeByCommande(this.user.id).subscribe((rs)=>{
        console.log("rs ",rs);
        this.rows=[...rs];
      },err=>{
        console.error(err);

      });
    }else{
      this.rows=[];
    }

  }

  get f() { return this.form.controls; }


  onSubmit(){
    this.valider = true;
    console.log("submit ",this.form);
    if(this.form.invalid){
      console.log("submit ",this.form);
      return;
    }
    let c={
      id:(this.user)?this.user.id:this.form.value.user,
      commande:this.form.value,
      listProduitCommande:this.rows,
      listDelete:this.listDelete
    };

    this.passEntry.emit(c);
    this.activeModal.close();
  }
  create() {
    const modalRef = this.modalService.open(SelectProduitCommandeComponent);
    modalRef.componentInstance.externalRows=this.rows;
    modalRef.componentInstance.passEntry.subscribe((receivedData) => {
      console.log("after change select produit valide ", receivedData);
      this.rows.push(receivedData);
      this.rows = [...this.rows];
    });
  }

  updateProduit(row = null) {
    console.log("row ", row);
    const modalRef = this.modalService.open(SelectProduitCommandeComponent);
    modalRef.componentInstance.externalProduit = row;
    modalRef.componentInstance.passEntry.subscribe((receivedData) => {
      console.log("receiv ", receivedData);
      const pos = this.rows.indexOf(row);
      this.rows.splice(pos, 1);
      row.prix=receivedData.prix;
      row.qte=receivedData.qte;
      row.produit=receivedData.produit;
      this.rows.push(row);

    });

   return ;

  }
  delete(row = null) {
    if(row.id){
      this.listDelete.push(row);
    }
    const pos = this.rows.indexOf(row);
    this.rows.splice(pos, 1);
  }
  getData() {
    this.rows=this.user.produitCommande;
  }

  updateFilter(event) {

  }

  onSelect(event) {

    //////console.log('Select Event', this.selected[this.selected.length-1]);
  }

  onActivate(event) {

    //////console.log('Activate Event', event);
  }

  toggleExpandRow(row) {

  }

  onDetailToggle(event) {

    //////console.log('Detail Toggled', event);
  }
}


