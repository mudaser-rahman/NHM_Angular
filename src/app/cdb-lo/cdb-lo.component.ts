import { Component } from '@angular/core';
import { EncryptionService } from '../Services/encryption-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cdb-lo',
  templateUrl: './cdb-lo.component.html',
  styleUrls: ['./cdb-lo.component.css']
})
export class CDBLoComponent {
  showDropdown: string = '';
  constructor(private router: Router, private encryptServices:EncryptionService){}
  ngOnInit() {
    if(this.encryptServices.checkLogin() == false){
      this.router.navigate(['login']);
    }
  }
}
