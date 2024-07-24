import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AddDistrictmaster } from 'src/app/Model/adddistrictmaster';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AdminservicesService } from 'src/app/Services/adminservices.service';
import { MatTableDataSource } from '@angular/material/table';
import { DistrictMaster } from 'src/app/Model/district-master';
import { Beneficearydetails } from 'src/app/Model/Beneficearydetails';
import { BeneficearyData } from 'src/app/Model/BeneficearyData';
@Component({
  selector: 'app-beneficearydetails',
  templateUrl: './beneficearydetails.component.html',
  styleUrls: ['./beneficearydetails.component.css']
})
export class BeneficearydetailsComponent {

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

  btnedit = false;
  btnupdate = false;

  public dataSource = new MatTableDataSource<BeneficearyData>();
  //adddistrictmaster: AddDistrictmaster = new AddDistrictmaster();

  addbeneficearydetails: Beneficearydetails= new Beneficearydetails();

  addbeneficearydata :BeneficearyData= new BeneficearyData();

  statecd = '';
  kon = '';
  district_code: string = '';
  district_name: string = '';
  distname_ll: string = '';
yearcd:string='';

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
  
  


  jwtHelper: any;
  localStorage: any;
  isUserAuthenticated: any;
  
 formValidate: FormGroup;
  
  adddistrictmaster :AddDistrictmaster =new AddDistrictmaster();
  formSubscription: Subscription | undefined;
input: any;
displayedColumns: string[] =  ['slNo', 'Years', 'State', 'noOfBeneficiary', 'Action'];

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

       component : new FormControl ('', [Validators.required] ),
       beneficeary: new FormControl('', [Validators.required]),
       mobileno: new FormControl('', [Validators.required]),
       aadharno: new FormControl('', [Validators.required]),
       subsidy: new FormControl('', [Validators.required]),
       remarks: new FormControl('', [Validators.required]),
      
    });
 
 
 
   }
 
  ngOnInit() {

  this.getstatemaster();   
       
    
      }

  
      public hasError = (controlName: string, errorName: string) => {
        // return this.formValidate.get(controlName)!.hasError(errorName);
         return this.formValidate.get(controlName)!.hasError(errorName);
      };

getstatemaster()
{
  
this.adminservicesService.GetStatemaster().subscribe((resultdistrictmaster) => {
  this.selectUserType = resultdistrictmaster;

  console.log(this.selectUserType, 'statemaster');


});


}


    


      Getdistictmaster(statecd:string) { 
        this.adminservicesService.Getdistrictmaster(this.statecd).subscribe((resultuser:any) =>{
          this.selectUserType =resultuser ;
          console.log(this.selectUserType, 'users');
          this.selectuser = '';
        });
      
      };
      
      
      
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
      
      
      GetSubcatergorymaster( categoryid:string) { 
      
        //https://localhost:7107/api/Adminapi/bindscheme?deptcd=01&kon=19
      
        this.adminservicesService.GetSubcategorymaster(this.categoryid).subscribe((resultuser:any) =>{
        this.Selectsubcategorymaster = resultuser;
          console.log(this.Selectsubcategorymaster, 'subcategory');
          this.selectcategory = '';
        });
      
      }
      
      GetSubcategory2master( subcategoryid:string) { 
      
        //https://localhost:7107/api/Adminapi/bindscheme?deptcd=01&kon=19
      
        this.adminservicesService.GetSubcategorymaster2(this.subcategoryid).subscribe((resultuser:any) =>{
        this.Selectsubcategorymaster2 = resultuser;
          console.log(this.Selectsubcategorymaster2, 'subcategory2');
          this.selectcategory = '';
        });
      
      }
      
      
          
      GetSubcatergorymaster3(subcatgoryid2:string ) { 
      
        //https://localhost:7107/api/Adminapi/bindscheme?deptcd=01&kon=19
      
        this.adminservicesService.GetSubcategorymaster3(this.subcatgoryid2).subscribe((resultuser:any) =>{
        this.selectsubcategorymaster3 = resultuser;
          console.log(this.selectsubcategorymaster3, 'subcategory3');
          this.selectcategory = '';
        });
      
      }
      
            
            
          getcomponentmaster(subcategory3id:string) {
           // alert("check village");
      
            this.adminservicesService.GetCopmponentmaster(this.subcategoryid3).subscribe((result:any) =>{
              this.selectcomponent = result;
                  console.log(this.selectcomponent, 'getcomponentmaster');
                  this.componentmaster='';
      
            });
      
      
          }
      
           
          GetBeneficearydatawise() {
          
        
            this.adminservicesService.GetBeneficearyData(this.statecd, this.yearcd).subscribe((data: any) => {
             
              this.dataSource.data = data as BeneficearyData[];
              console.log(this.data, 'SaveData');
    
            });
          }

  

poststatebeneficearydata()
{
this.addbeneficearydata.SCode= this.statecd;
this.addbeneficearydata.Years=this.yearcd;
this.addbeneficearydata.NoOfBeneficiary=this.addbeneficearydata.NoOfBeneficiary;

this.adminservicesService.PostBeneficearyData(this.addbeneficearydata).subscribe((result: any) => {
  this.updatedistrictmaster = result;
  console.log(this.updatedistrictmaster, 'postdistrictmaster');   
  alert("Data IS Approved Sucessfully!!!");

  this.GetBeneficearydatawise(); 

});

}



ClearAllDATA()
{

this.addbeneficearydata.SCode="";
this.addbeneficearydata.Years="";
this.addbeneficearydata.NoOfBeneficiary="";

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
    
          this.Getdistictmaster(this.statecd); 

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
    
          this.Getdistictmaster(this.statecd);

        });

      }


      Deletedistrictmaster(item:any)
      {

        this.adddistrictmaster.DistrictCode=this.distcd;

        this.adminservicesService.deletedistrctmaster(this.distcd).subscribe((result: any) => {
          this.updatedistrictmaster = result;
          console.log(this.updatedistrictmaster, 'Delete district');   
          alert("Data IS Deleted Sucessfully!!!");
    
          this.Getdistictmaster(this.statecd);

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
        this.Getdistictmaster(this.statecd);
      }
    
}
