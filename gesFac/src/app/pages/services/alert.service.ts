import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastr: ToastrService) { }

  alert(message: string, type: string) {
    switch (type) {
      case "success":
        this.toastr.success(message,"Information");
        break;
      case "warning":
        this.toastr.warning(message,"Attention")
        break;
      case "danger":
        this.toastr.error(message,"Danger");
        break;
    }
  }
}
