import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EncryptionService } from '../Services/encryption-service.service';

@Component({
  selector: 'app-cdb-ae-one-year',
  templateUrl: './cdb-ae-one-year.component.html',
  styleUrls: ['./cdb-ae-one-year.component.css']
})
export class CDBAEOneYearComponent {
  constructor(private router: Router, private encryptServices:EncryptionService){}
  ngOnInit() {
    if(this.encryptServices.checkLogin() == false){
      this.router.navigate(['login']);
    }
  }

}
