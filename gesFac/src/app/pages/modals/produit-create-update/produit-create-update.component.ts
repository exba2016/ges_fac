import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-produit-create-update',
  templateUrl: './produit-create-update.component.html',
  styleUrls: ['./produit-create-update.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProduitCreateUpdateComponent implements OnInit {

  @Input() public user;
  valider: boolean;
  @Output() public passEntry = new EventEmitter<any>();
  form: FormGroup;
  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder,private loginService:LoginService) { }
  roles=[];
  ngOnInit(): void {
    this.valider = false;
    this.form = this.formBuilder.group({
      
      libelle:['', Validators.required],
      prix:['', Validators.required],
      prixMin:['', Validators.required],
      qte:['', Validators.required]
    });


    if(this.user){
      this.form.patchValue({
        libelle:this.user.libelle,
        prix:this.user.prix,
        prixMin:this.user.prixMin,
        qte:this.user.qte
      });
    }

  }

  get f() { return this.form.controls; }

  
  onSubmit(){
    this.valider = true;

    if(this.form.invalid){
      return;
    }

    this.passEntry.emit(this.form.value);
    this.activeModal.close();
  }

}

