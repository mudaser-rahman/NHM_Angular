import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EncryptionService } from '../Services/encryption-service.service';

@Component({
  selector: 'app-cdb-home',
  templateUrl: './cdb-home.component.html',
  styleUrls: ['./cdb-home.component.css']
})


export class CdbHomeComponent {
  @Input() receivedData: any = '';
  constructor(private router: Router, private encryptServices:EncryptionService){}
  ngOnInit() {
    if(this.encryptServices.checkLogin() == false){
      this.router.navigate(['login']);
    }
  }

  title = 'ProjectCDB';
  randomName(receivedData:any) {
    receivedData.toggle();
}


}
