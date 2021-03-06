import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-user-create-update',
  templateUrl: './user-create-update.component.html',
  styleUrls: ['./user-create-update.component.scss']
})
export class UserCreateUpdateComponent implements OnInit {
  @Input() public user;
  valider: boolean;
  @Output() public passEntry = new EventEmitter<any>();
  form: FormGroup;
  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder,private loginService:LoginService) { }
  roles=[];
  ngOnInit(): void {
    this.valider = false;
    this.form = this.formBuilder.group({
      
      nom:['', Validators.required],
      telephone:['', Validators.required],
      role:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      adresse:['', Validators.required]
    });

    this.loginService.getAllRoles().subscribe((rs)=>{
      this.roles=rs;
    },error=>{
      console.error(error);
      
    });

    if(this.user){
      this.form.patchValue({
        nom:this.user.nom,
        telephone:this.user.telephone,
        role:this.user.role.id,
        email:this.user.email,
        adresse:this.user.adresse
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

