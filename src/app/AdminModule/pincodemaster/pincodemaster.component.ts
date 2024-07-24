import { Component } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MandalMasterang } from 'src/app/Model/MandalMasterang';
import { VillageMaster } from 'src/app/Model/village-master';
import { AdminservicesService } from 'src/app/Services/adminservices.service';


@Component({
  selector: 'app-pincodemaster',
  templateUrl: './pincodemaster.component.html',
  styleUrls: ['./pincodemaster.component.css']
})
export class PincodemasterComponent {

  
  data: any = [];
  blockcode: any = [];
  distcode:any=[];
  allcrops: any = [];
  CropCode: any = [];
  CropCodeChecked: any = [];
  categoryCheckedData: any = [];
  selectedCategory: string = '';
  categoryName: string = '';
  area: string = '';
  state: string = '';
 
  department: string = '';
  OP: string = '';
  CropOrder: string = '';
  kon: string='34';
  isChecked = true;
  isHidden = false;
  checkboxValues: any;
  selectUserType:any=[];
  selectUser: string = 'default';
 
 statecd :string='34';
 distcd :string='';
 mandalcd: string='01';
 mandal_name :string='';
 mandal_name_ll :string='';
 
 // formValidate: FormGroup;
 // formSubscription: Subscription;
 addvillagemaster :VillageMaster =new VillageMaster();
 
 
 
 
 
  btnedit=false;
  btnupdate=false;
 
  updatedmandalmaster: any[] = [];
  mandalmaster: string = 'default';
 
  deletemandaldata :any=[];
  deletemandal :string='default';
 
 
 
  formValidate: FormGroup;
  formSubscription: Subscription;
   localStorage: any;
   adminservicesService: any;
  // formValidate = new FormGroup({
  //   // state: new FormControl(''),
  //   // state: new FormControl({ value: '', disabled: true }),
  //   distname: new FormControl('', [Validators.required, Validators.maxLength(75), Validators.pattern('[a-zA-Z- ]*')]),
  //   distnameLI: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.pattern('[a-zA-Z- ]*')])
  // })
 
 
  constructor(private http: HttpClient , private router:Router,    private formBuilder: FormBuilder) {
 
       
    this.formValidate = this.formBuilder.group({
      // state: new FormControl({ value: '', disabled: true }),
      district: new FormControl('', [Validators.required]),
      mandal: new FormControl('', [Validators.required]),
 
      mandalname: new FormControl('', [Validators.required]),
      mandalnameLI: new FormControl('', [Validators.required]),
      // village: new FormControl('', [Validators.required]),
      // bank: new FormControl('', [Validators.required]), 
  
      // branch: new FormControl('', [Validators.required, Validators.maxLength(200), Validators.pattern('[a-zA-Z- ]*')]),
      // branchLl: new FormControl('', [Validators.required, Validators.maxLength(200), Validators.pattern('[a-zA-Z- ]*')]),
      // branchEcsNo: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern('[a-zA-Z0-9-]*')]),
      // hnoAptno: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern('[0-9-]*')]),
      // streetLoc: new FormControl('', [Validators.required, Validators.maxLength(500), Validators.pattern('[a-zA-Z- ]*')]),
      // phoneNo: new FormControl('', [Validators.required, Validators.maxLength(8), Validators.pattern('[0-9-]*')]),
      // faxNo: new FormControl('', [Validators.required, Validators.maxLength(8), Validators.pattern('[0-9-]*')]),
      // mobileNo: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern('[0-9-]*')]),
      // contactPerson: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z- ]*')]),
      // designationCode: new FormControl('', [Validators.required, Validators.maxLength(2), Validators.pattern('[0-9-]*')]),
      // emailId: new FormControl('', [Validators.required,Validators.email, Validators.maxLength(50), Validators.pattern('[a-zA-Z-0-9@. ]*')])
    });
 
 
    this.formSubscription = this.formValidate.get('district')!.valueChanges.subscribe((newValue) => {
      this.getmandaldata(newValue);
    });
 
 
   }
 
  ngOnInit() {
    if(this.isUserAuthenticated() !=true)
    {
      this.router.navigate(["/NHMlogin"]);
    }
    
    else{
      this.statecd= JSON.parse(this.localStorage.getItem('state_code'));
    
    
      if(this.statecd == '')
      {
        this.router.navigate(["/NHMlogin"]);
      }
    }
 
 
    this.getmandaldata(this.distcd);
    this.getdistrictmasterdata();
   
 
  }
  isUserAuthenticated()
  {
    const token=this.localStorage.getItem("jwt");
  
    if(token !=null || token !='')
    {
      return true;
  
    }
  
    else{
      return false;
    }
  }
 
  public hasError = (controlName: string, errorName: string) => {
    // return this.formValidate.get(controlName)!.hasError(errorName);
     return this.formValidate.get(controlName)!.hasError(errorName);
  };
 
 
 
  getmandaldata(distcd:string) {
 
    if(this.distcd)
    {
 
      this.adminservicesService.getmandlmaster(this.statecd, this.distcd, this.kon).subscribe((result: any) => {
    
        this.data = result;
        console.log(this.data, 'mandalmaster');
      });
 
    }
    
    }
 
 
 
  getdistrictmasterdata() {
 
    this.adminservicesService.Getdistrictmaster(this.statecd, this.kon).subscribe((resultdistrictmaster: any) =>{
    //this.http.get(`https://localhost:7107/api/Adminapi/GetDistrictmasters?kon=19&statecd=19`).subscribe((resultuser: any) => {
      this.selectUserType = resultdistrictmaster;
      console.log(this.selectUserType, 'district');
      this.selectUser = '';
    });
 
  };
  
 
 
 
    
  postmandalmaster() {
   
 
    this.formValidate.markAllAsTouched();
    if(this.formValidate.invalid){
      return;
    }
 
    
 console.log("data",this.addvillagemaster);
  
 this.adminservicesService.postmandalmaster(this.kon, this.addvillagemaster).subscribe((result: any) => {
 // var url='https://localhost:7104/api/AdminApi/PostMandalmaster?kon=' +this.kon+  addmandalmaster
 //     this.http.post(url, HttpHeaders ).subscribe((result: any) => {
      this.updatedmandalmaster = result;
      console.log(this.updatedmandalmaster, 'postdistrictmaster');
      this.mandalmaster = '';
      alert("Data IS Approved Sucessfully!!!");
  
      this.getmandaldata(this.distcd);
     });
  }
  
  
  Updatemandalmaster(data:any)
  {
    alert("chedck data" );
    console.log("updatedata" , data);
 
 
 //
 
    var url='https://localhost:7104/api/AdminApi/Updatemandalmaster?statecd=' +this.statecd+ '&distcd=' +this.distcd +  '&mandalcd='+ data.mandal_code+ '&kon=' +this.kon+ '&mandal_name=' + data.mandal_name+ '&mandal_name_ll=' +data.mandal_name_ll+''
    this.http.put(url,HttpHeaders).subscribe((result: any) => {
      this.updatedmandalmaster = result;
      console.log(this.updatedmandalmaster, 'updatemandal master');
      this.mandalmaster = '';
  
      alert("Data IS updated  Sucessfully!!!");
      this.getmandaldata(this.distcd);
  
     });
  
  }
      
 
 
 
  
  Editmandalmaster(item:any){
  
    this.btnedit=true;
  if(this.btnupdate= false)
  {
    this.btnupdate=true;
    this.btnedit=false;
  }
    
  item.editable=!item.editable;
  
  
  
  }
  
  
  
  
  
  DeleteMandalmaster(data :any) {
    alert("deletedata");
  console.log("deletezone", data);
 //  https://localhost:7104/api/AdminApi/Deletemandalmaster?mandalcd=08&kon=34
 
    var url='https://localhost:7104/api/AdminApi/Deletemandalmaster?mandalcd='+ data.mandal_code+ '&kon=' +this.kon+'';
    
    this.http.delete(url).subscribe((result: any) => {
      this.deletemandaldata = result;
      console.log(this.deletemandaldata, 'deletezonemaster');
      this.deletemandal = '';
  
    alert(result.message);
  
    alert("data is deleted");
  
    this.getmandaldata(this.distcd);
  
    });
  
  }
  
  
 
}
