import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EncryptionService } from '../Services/encryption-service.service';
import { Router } from '@angular/router';
import { LoginUser } from '../Model/login-user';
import Swal from 'sweetalert2';
import { sha256 } from 'js-sha256';
import { Credentials } from '../Model/credentials';
import { AdminservicesService } from '../Services/adminservices.service';


@Component({
  selector: 'app-cdb-login',
  templateUrl: './cdb-login.component.html',
  styleUrls: ['./cdb-login.component.css']
})
export class CdbLoginComponent {
  TxtCaptchaa: string = '';
  loginUser: LoginUser = new LoginUser();
  credentials: Credentials = new Credentials();
  showLogin: boolean = false;
  showSignUp: Boolean = false;
  hiddensalt: string = '';

  statecd:string='';
  selectUserType:any=[];
  selectuser:string='';

  selectdistrictdata:any=[];
  selectdistrict :string='default';


  Postloginmaster :any[]=[];

  constructor(private router: Router, private formBuilder: FormBuilder, private encryptionService: EncryptionService,  private adminservicesService: AdminservicesService) { }




  ngOnInit() {
    this.refreshCaptcha();
    this.showLogin = true;
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.aFormGroup.get(controlName)!.hasError(errorName);
  };
  login(ak: string) {
    this.router.navigate(['adminlayout']);
   
  }
  aFormGroup = this.formBuilder.group({
    userId: ['', Validators.required],
    password: ['', Validators.required],
    captcha: ['', Validators.required]
  });

  ResisterUser() {
    this.showLogin = false;
    this.showSignUp = true;
  }

  captcha!: string;

  generateCaptcha(length: number): string {
    const characters = '0123456789';
    let captcha = '';
    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * characters.length);
      captcha += characters[index];
    }
    return captcha;
  }
  refreshCaptcha() {
    this.captcha = this.generateCaptcha(6); // Change 6 to your desired length
  }
  validateCaptcha(): boolean {
    console.log("randaom", this.captcha);
    console.log("Entered captcha", this.TxtCaptchaa);
    if (this.TxtCaptchaa === this.captcha) {
      return true;
    }
    else {
      return false;
    }
  }

  shacode() {
    this.hiddensalt = this.myRandomNumber();
    console.log("first"+this.credentials.password);
    var shacd = sha256(this.credentials.password) + this.hiddensalt;
    const cred = sha256(this.credentials.password);

    var shacd1 = sha256(shacd);
    this.credentials.password = shacd1;
    this.credentials.hiddensalt = this.hiddensalt;
    console.log(this.credentials);
  }
  private myRandomNumber(): string {
    const length = 10;
    const characters = '0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }






  getstatemaster()
  {
    
  this.adminservicesService.GetStatemaster().subscribe((resultdistrictmaster) => {
    this.selectUserType = resultdistrictmaster;
  
    console.log(this.selectUserType, 'statemaster');
  
  
  });
  
  
  }
  
  
      
  
  
        Getdistictmaster(statecd:string) { 
          this.adminservicesService.Getdistrictmaster(this.statecd).subscribe((resultuser:any) =>{
            this.selectdistrictdata =resultuser ;
            console.log(this.selectdistrictdata, 'district');
            this.selectuser = '';
          });
        
        };
        





  Postlogindetails()
  {

    this.adminservicesService.Loginpage(this.loginUser).subscribe((result: any) => {
      this.Postloginmaster = result;
      console.log(this.Postloginmaster, 'login');   
      alert("Login is Sucessfully!!!");
      this.router.navigate(['adminlayout']);
   
    
    });


  }





}
