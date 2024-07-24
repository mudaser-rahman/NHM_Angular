import { Component } from '@angular/core';
import { EncryptionService } from '../Services/encryption-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subsidy-one-year',
  templateUrl: './subsidy-one-year.component.html',
  styleUrls: ['./subsidy-one-year.component.css']
})
export class SubsidyOneYearComponent {
  constructor(private router: Router, private encryptServices:EncryptionService){}
  ngOnInit() {
    if(this.encryptServices.checkLogin() == false){
      this.router.navigate(['login']);
    }
  }
}
