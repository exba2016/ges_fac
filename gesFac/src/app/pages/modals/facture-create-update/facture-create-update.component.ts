import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {LoginService} from '../../services/login.service';
import {FileService} from '../../service/file.service';

@Component({
  selector: 'app-facture-create-update',
  templateUrl: './facture-create-update.component.html',
  styleUrls: ['./facture-create-update.component.scss']
})
export class FactureCreateUpdateComponent implements OnInit {
  @ViewChild('htmlData') htmlData: ElementRef;
  @Input() public commande;
  @Input() public produitCommande;
  valider: boolean;
  @Output() public passEntry = new EventEmitter<any>();
  form: FormGroup;
  constructor(public fileService:FileService,public activeModal: NgbActiveModal, private formBuilder: FormBuilder,private loginService:LoginService) { }
  roles=[];
  ngOnInit(): void {
    console.log("facture ",this.commande, " ",this.produitCommande," ", this.htmlData);

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
