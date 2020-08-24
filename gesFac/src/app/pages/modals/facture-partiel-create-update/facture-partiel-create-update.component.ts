import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AlertService} from '../../services/alert.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {LoginService} from '../../services/login.service';
import html2canvas from 'html2canvas';
import {jsPDF} from "jspdf";

@Component({
  selector: 'app-facture-partiel-create-update',
  templateUrl: './facture-partiel-create-update.component.html',
  styleUrls: ['./facture-partiel-create-update.component.scss']
})
export class FacturePartielCreateUpdateComponent implements AfterViewInit{

  @Input() public montantApayer:any;
  @Input() public commande:any;
  @Input() public produitCommande:any;
  valider: boolean;
  @ViewChild('htmlData') htmlData: ElementRef;
  @Output() public passEntry = new EventEmitter<any>();
  form: FormGroup;
  constructor(public alertService:AlertService,public activeModal: NgbActiveModal, private formBuilder: FormBuilder,private loginService:LoginService) {
    console.log("facture ",this.commande, " ",this.produitCommande," ", this.htmlData);
  }

  ngAfterViewInit(): void {
    console.log("facture ",this.commande," montant A payer ",this.montantApayer, " ",this.produitCommande," ", this.htmlData);
    const DATA = this.htmlData.nativeElement;
    html2canvas(DATA).then((canvas)=>{
      console.log(this.htmlData.nativeElement);
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF();
      const imageHeight = canvas.height * 208 / canvas.width;
      doc.addImage(imgData, 0, 0, 208, imageHeight);
      let name="facture_"+new Date().getTime();
      //doc.save(name);
      let data=doc.output("blob");

      this.loginService.addFacturePartial(data,this.commande.id).subscribe((rs) => {
        if (rs) {
          this.alertService.alert("Modification de la facture éffectué avec succes !", "success");
        } else {
          this.alertService.alert("Echec de la modification de la facture!", "warning");
        }
        doc.save(name);
      }, e => {
        console.error(e);

      });
    });

  }
  roles=[];
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
