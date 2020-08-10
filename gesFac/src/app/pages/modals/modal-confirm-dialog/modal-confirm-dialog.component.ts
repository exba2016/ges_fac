import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirm-dialog',
  templateUrl: './modal-confirm-dialog.component.html',
  styleUrls: ['./modal-confirm-dialog.component.scss']
})
export class ModalConfirmDialogComponent implements OnInit {

  @Input() public title;
  @Input() public content;
  @Output() public passEntry = new EventEmitter<any>();
  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  remove(){
    this.passEntry.emit();
    this.modal.close();
  }

  del(){
    
  }
}
