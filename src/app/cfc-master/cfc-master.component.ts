import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CfcMaster } from '../Model/cfc-master';
import { Router } from '@angular/router';
import { CfcDetailsService } from '../Services/cfc-details.service';
import Swal from 'sweetalert2';
import { EncryptionService } from '../Services/encryption-service.service';

@Component({
  selector: 'app-cfc-master',
  templateUrl: './cfc-master.component.html',
  styleUrls: ['./cfc-master.component.css']
})
export class CfcMasterComponent {
  isPosted : boolean =false;
  cfcMaster: CfcMaster = new CfcMaster();

  constructor(private router: Router, private cfcDetailsService: CfcDetailsService,private encryptServices:EncryptionService) {}
  
  ngOnInit(){
    if(this.encryptServices.checkLogin() == false){
      this.router.navigate(['login']);
    }
  }
  cfcMasterValidateForm: FormGroup = new FormGroup({
    cfcName: new FormControl('', [Validators.required, Validators.maxLength(50),Validators.pattern('[a-zA-Z ]*')]),
    remark: new FormControl('', [Validators.maxLength(100),Validators.pattern('[a-zA-Z ]*')])
  })
  public hasError = (controlName: string, errorName: string) => {
     return this.cfcMasterValidateForm.get(controlName)!.hasError(errorName);
  };

  save(){
    this.isPosted = false;
    this.cfcMasterValidateForm.markAllAsTouched();
    if(this.cfcMasterValidateForm.invalid){
      return;
    }
    this.cfcMaster.isDeleted = false;
    this.cfcMaster.cfcCode = "000";
    this.cfcDetailsService.postCfcMaster(this.cfcMaster).subscribe((data)=>{
      this.isPosted = data as boolean;
      if(this.isPosted == true){
        Swal.fire({
          icon: 'success',
          text: 'Added Successfully',
          allowOutsideClick: false
        });
        this.cfcMasterValidateForm.reset();
      }
    })
    
  }

  cancel(){
    this.router.navigate(['empty']);
  }
}
