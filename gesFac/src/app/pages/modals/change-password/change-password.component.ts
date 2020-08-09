import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {LoginService} from '../../services/login.service';
import { GlobalService } from '../../services/global.service';
import { AlertService } from '../../services/alert.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  valider: boolean;
  @Output() public passEntry = new EventEmitter<any>();
  formChangePassword: FormGroup;
  services: any;
  lesspecialites: any;
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    public globalService:GlobalService,
    private alertService:AlertService,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.valider = false;
    this.formChangePassword = this.formBuilder.group({
      oldPassword:['', Validators.required],
      newPassword:['', Validators.required],
      newPasswordRepeat:['', Validators.required]
    });

  }

  get f() { return this.formChangePassword.controls; }


  onSubmit(){
    this.valider = true;
    
    if(this.formChangePassword.invalid && this.globalService.user.statuts==='active'){
      
      return;
    }

    this.passEntry.emit(this.formChangePassword.value);
    this.activeModal.close();
  }

}
