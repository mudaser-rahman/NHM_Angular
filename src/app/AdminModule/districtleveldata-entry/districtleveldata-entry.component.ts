import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AddDistrictmaster } from 'src/app/Model/adddistrictmaster';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AdminservicesService } from 'src/app/Services/adminservices.service';
import { MatTableDataSource } from '@angular/material/table';
import { Beneficearydetails } from 'src/app/Model/Beneficearydetails';
import { MatRadioButton } from '@angular/material/radio';


@Component({
  selector: 'app-districtleveldata-entry',
  templateUrl: './districtleveldata-entry.component.html',
  styleUrls: ['./districtleveldata-entry.component.css']
})
export class DistrictleveldataEntryComponent {

  
  data: any[] = [];
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

  btnedit = false;
  btnupdate = false;

  public dataSource = new MatTableDataSource<Beneficearydetails>();
  //adddistrictmaster: AddDistrictmaster = new AddDistrictmaster();

  addbeneficearydetails: Beneficearydetails= new Beneficearydetails();


  statecd = '';
  kon = '';
  district_code: string = '';
  district_name: string = '';
  distname_ll: string = '';
yearcd:string='';
Frommonthcd:string='';
Tomonthcd:string='';
temp: string='0';

componentid:string='';

  updatedistrictmaster: any[] = [];
  districtmaster: string = 'default';

  deletedistrictdata: any = [];
  deletedistmaster: string = 'default';


  selectUserType:any=[];
  selectuser:string='';

  selectdistrictdata:any=[];
  selectdistrict :string='default';

  Selectcategorydata:any=[];
  selectcategory :string='default';

  Selectyeardata:any=[];
  selectyear:string='';

  selectstatemaster :any=[];
  statemaster :string='';
  
  Selectsubcategorymaster:any=[];
  selectsubcategory:string='';


  Selectsubcategorymaster2:any=[];
  selectsubcategory2 :string='';

  selectsubcategorymaster3 :any =[];
  selectsubcategory3 :string='';

  categoryid :string='';
  subcategoryid :string='';
  subcatgoryid2 :string='';
  
  subcategoryid3 :string='';
  

  selectcomponent :any=[];
  componentmaster :string='default';
  
  selecttomonthdata: any=[];
  selecttomonth:string='';


  jwtHelper: any;
  localStorage: any;
  isUserAuthenticated: any;
  
 formValidate: FormGroup;
  
  adddistrictmaster :AddDistrictmaster =new AddDistrictmaster();
  formSubscription: Subscription | undefined;
input: any;
displayedColumns: string[] = ['slNo', 'Years', 'State', 'noOfBeneficiary', 'Action'];

  constructor(private http: HttpClient , private router:Router,  private formBuilder: FormBuilder, 
    private adminservicesService: AdminservicesService) {

      
    this.formValidate = this.formBuilder.group({
       state: new FormControl('', [Validators.required] ),
       district : new FormControl ('', [Validators.required] ),
       year : new FormControl ('', [Validators.required] ),
       category : new FormControl ('', [Validators.required] ),
       subcategory : new FormControl ('', [Validators.required] ),
       subcategory2 : new FormControl ('', [Validators.required] ),
       subcategory3 : new FormControl ('', [Validators.required] ),
       month : new FormControl ('', [Validators.required] ),
       month2 : new FormControl ('', [Validators.required] ),

       component : new FormControl ('', [Validators.required] ),
       beneficeary: new FormControl('', [Validators.required]),
       mobileno: new FormControl('', [Validators.required]),
       aadharno: new FormControl('', [Validators.required]),
       subsidy: new FormControl('', [Validators.required]),
       remarks: new FormControl('', [Validators.required]),
      
    });
 
 
 
   }
 
  ngOnInit() {

  this.GetYearmaster();   
       
    
      }

  
      public hasError = (controlName: string, errorName: string) => {
        // return this.formValidate.get(controlName)!.hasError(errorName);
         return this.formValidate.get(controlName)!.hasError(errorName);
      };

getMonthwisedata()
{
  
this.adminservicesService.getmonths().subscribe((resultdistrictmaster) => {
  this.selectUserType = resultdistrictmaster;

  console.log(this.selectUserType, 'Frommonth');


});


}

gettommonthdata()
{
  
this.adminservicesService.getmonths().subscribe((resultdistrictmaster) => {
  this.selecttomonthdata = resultdistrictmaster;

  console.log(this.selecttomonthdata, 'Tomonth');


});


}





    


      
      
      
      GetYearmaster() { 
        this.adminservicesService.getyearmaster().subscribe((resultuser:any) =>{
          this.Selectyeardata =resultuser ;
          console.log(this.Selectyeardata, 'users');
          this.selectyear = '';
        });
      
      };
      
      
      GetCategorymaster( ) { 
      
        //https://localhost:7107/api/Adminapi/bindscheme?deptcd=01&kon=19
      
        this.adminservicesService.GetCategorymaster().subscribe((resultuser:any) =>{
        this.Selectcategorydata = resultuser;
          console.log(this.Selectcategorydata, 'category');
          this.selectcategory = '';
        });
      
      }
      
      
      



 GetDistrictleveldatastatus ()
 {
  this.adminservicesService.GetDistrictwiseReportstatus(this.yearcd, this.Frommonthcd, this.Tomonthcd,  this.temp).subscribe((result) => {
    
    // this.data = result as any [];
    // console.log(this.data, 'stateleveldata');

   this.data = result[0]?.Table || []; // Adjust based on your JSON structure
   console.log(this.data, 'districtleveldatra');
  });

 }

 







      postdistrictmaster()
      {
        alert("check data")

        this.adddistrictmaster.DistrictCode= "01";
    this.adddistrictmaster.StateCode=this.statecd;
    this.adddistrictmaster.LgCodeDistrict="02";
    
   

        this.adminservicesService.Postdistrictmasters(this.adddistrictmaster).subscribe((result: any) => {
          this.updatedistrictmaster = result;
          console.log(this.updatedistrictmaster, 'postdistrictmaster');   
          alert("Data IS Approved Sucessfully!!!");
    
         // this.Getdistictmaster(this.statecd); 

        });


      }


      Updatedistrictmasterdata(data:any)
      {

        this.adddistrictmaster.DistrictCode=data.distcd;
        this.adddistrictmaster.DistrictName=data.distname;

        this.adminservicesService.updatedistrictmaster(this.distcd, this.adddistrictmaster).subscribe((result: any) => {
          this.updatedistrictmaster = result;
          console.log(this.updatedistrictmaster, 'Update district');   
          alert("Data IS Approved Sucessfully!!!");
    
         // this.Getdistictmaster(this.statecd);

        });

      }


      Deletedistrictmaster(item:any)
      {

        this.adddistrictmaster.DistrictCode=this.distcd;

        this.adminservicesService.deletedistrctmaster(this.distcd).subscribe((result: any) => {
          this.updatedistrictmaster = result;
          console.log(this.updatedistrictmaster, 'Delete district');   
          alert("Data IS Deleted Sucessfully!!!");
    
         // this.Getdistictmaster(this.statecd);

        });

      }


      edit(item:any)

      {
 
        // this.btnedit=true;
        // if(this.btnupdate= false)
        // {
        //   this.btnupdate=true;
        //   this.btnedit=false;
        // }
          
        item.editable=!item.editable;
        
        
      }

      
      Editdistrictmaster(item: any) {
        item.isEditing = true;
        item.editable = !item.editable;
      }


      cancelEdit(item: any) {
        item.isEditing = false;
        item.editable = !item.editable;
       // this.Getdistictmaster(this.statecd);
      }
    




}


