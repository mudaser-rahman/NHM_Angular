import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { EncryptionService } from '../Services/encryption-service.service';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css']
})
export class BankDetailsComponent {
  constructor(private router: Router, private encryptServices:EncryptionService){}
  ngOnInit() {
    if(this.encryptServices.checkLogin() == false){
      this.router.navigate(['login']);
    }
  }
  showBank: boolean= false;
  showAddress: boolean = true;
  bankDetails(){
    this.showAddress = false;
    this.showBank = true;
  }

  addressDetails(){
    this.showAddress = true;
    this.showBank = false;
  }

  showForm(){
    this.showAddress = true;
    this.showBank = true;
  }
}
