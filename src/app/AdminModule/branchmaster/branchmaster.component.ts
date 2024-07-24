import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AddDistrictmaster } from 'src/app/Model/adddistrictmaster';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AdminservicesService } from 'src/app/Services/adminservices.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-branchmaster',
  templateUrl: './branchmaster.component.html',
  styleUrls: ['./branchmaster.component.css']
})
export class BranchmasterComponent {

  
  data: any = [];
  Zonecode: any = [];
  distcode: any = [];
  allcrops: any = [];
  CropCode: any = [];
  CropCodeChecked: any = [];
  categoryCheckedData: any = [];
  selectedCategory: string = '';
  categoryName: string = '';
  area: string = '';
  state: string = '';
  distcd: string = '01';
  department: string = '';
  OP: string = '';
  CropOrder: string = '';
  isChecked = true;
  isHidden = false;
  checkboxValues: any;


  selectUserType:any=[];
  selectUser: string = 'default';
 
  btnedit = false;
  btnupdate = false;


  //adddistrictmaster: AddDistrictmaster = new AddDistrictmaster();

  statecd = '32';
  kon = '';
  district_code: string = '';
  district_name: string = '';
  distname_ll: string = '';


  updatedistrictmaster: any[] = [];
  districtmaster: string = 'default';

  deletedistrictdata: any = [];
  deletedistmaster: string = 'default';
  jwtHelper: any;
  localStorage: any;
  isUserAuthenticated: any;
  
 formValidate: FormGroup;
  
  adddistrictmaster :AddDistrictmaster =new AddDistrictmaster();
  formSubscription: Subscription | undefined;


  constructor(private http: HttpClient , private router:Router,  private formBuilder: FormBuilder, 
    private adminservicesService: AdminservicesService) {

      
    this.formValidate = this.formBuilder.group({
      // state: new FormControl({ value: '', disabled: true }),
      distname: new FormControl('', [Validators.required]),
       distnameLI: new FormControl('', [Validators.required]),
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
 
 
 
   }
 
  ngOnInit() {

  
    
    
        this.getdistrictData();
       
    
      }

    
      
    
    
      public hasError = (controlName: string, errorName: string) => {
        // return this.formValidate.get(controlName)!.hasError(errorName);
         return this.formValidate.get(controlName)!.hasError(errorName);
      };


      getdistrictData()
      {

        this.adminservicesService.Getdistrictmaster(this.statecd).subscribe((resultdistrictmaster) => {
          this.data = resultdistrictmaster;
    
          console.log(this.distcd, 'districtmaster');
    
          this.distcd = this.data[0].district_code;
          this.district_name = this.data[0].district_name;
          this.distname_ll = this.data[0].district_name_ll;
        });
        
      }



      getdistrictmasterdata() {
 
        this.adminservicesService.Getdistrictmaster(this.statecd).subscribe((resultdistrictmaster: any) =>{
        //this.http.get(`https://localhost:7107/api/Adminapi/GetDistrictmasters?kon=19&statecd=19`).subscribe((resultuser: any) => {
          this.selectUserType = resultdistrictmaster;
          console.log(this.selectUserType, 'district');
          this.selectUser = '';
        });
     
      };
      
     

      postdistrictmaster()
      {


      }


      Updatedistrictmasterdata(item:any)
      {

      }


      Deletedistrictmaster(item:any)
      {

      }

      cancelEdit(item:any)
      {


      }

      edit(item:any)

      {
 
        this.btnedit=true;
        if(this.btnupdate= false)
        {
          this.btnupdate=true;
          this.btnedit=false;
        }
          
        item.editable=!item.editable;
        
        
      }



}
