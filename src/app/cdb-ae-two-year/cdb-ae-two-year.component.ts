import { Component } from '@angular/core';
import { EncryptionService } from '../Services/encryption-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cdb-ae-two-year',
  templateUrl: './cdb-ae-two-year.component.html',
  styleUrls: ['./cdb-ae-two-year.component.css']
})
export class CDBAETwoYearComponent {
  constructor(private router: Router, private encryptServices:EncryptionService){}
  ngOnInit() {
    if(this.encryptServices.checkLogin() == false){
      this.router.navigate(['login']);
    }
  }
}
