import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AddDistrictmaster } from 'src/app/Model/adddistrictmaster';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AdminservicesService } from 'src/app/Services/adminservices.service';
import { MatTableDataSource } from '@angular/material/table';
import { ComponentSelectionmaster } from 'src/app/Model/Componentseelction';
import { CoEDetailsComponent } from '../co-edetails/co-edetails.component';
import { CoEDetailsmaster } from 'src/app/Model/CoEdetailsmaster';

@Component({
  selector: 'app-co-edetails-entry',
  templateUrl: './co-edetails-entry.component.html',
  styleUrls: ['./co-edetails-entry.component.css']
})
export class CoEDetailsEntryComponent {

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

  public dataSource = new MatTableDataSource<CoEDetailsComponent>();
  //adddistrictmaster: AddDistrictmaster = new AddDistrictmaster();

addcomponentselection: ComponentSelectionmaster= new ComponentSelectionmaster();
addcoedetailsmaster: CoEDetailsmaster= new CoEDetailsmaster();

  statecd = '';
  kon = '';
  district_code: string = '';
  district_name: string = '';
  distname_ll: string = '';
yearcd:string='';
choicecd:string='';

monthcd:string='';

componentid:string='';

  updatedistrictmaster: any[] = [];
  districtmaster: string = 'default';

  deletedistrictdata: any = [];
  deletedistmaster: string = 'default';


  selectUserType:any=[];
  selectuser:string='';

  selectmonthmaster:any=[];
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
  
  formSubscription: Subscription | undefined;
input: any;
displayedColumns: string[] = ['slNo','coE_Id', 'Years', 'Months', 'Coename', 'Nodemonstaration', 'Technologies','Sourceoftechnologies', 'statusofcoe', 'calendartimings',  'Nofarmers', 'plants', 'seedlings', 'quantity', 'expenditure', 'Remarks', 'Action'];

  constructor(private http: HttpClient , private router:Router,  private formBuilder: FormBuilder, 
    private adminservicesService: AdminservicesService) {

      
    this.formValidate = this.formBuilder.group({
      choice: new FormControl('', [Validators.required] ),
      months: new FormControl('', [Validators.required] ),
      
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
        
          console.log(this.selectUserType, 'months');
        
        
        });


      }

getmonthmaster()
{
  
this.adminservicesService.getmonths().subscribe((resultdistrictmaster) => {
  this.selectmonthmaster = resultdistrictmaster;

  console.log(this.selectmonthmaster, 'months');


});


}


    



      getcoedetailsentry() { 
        this.adminservicesService.GetCoeDetailsentry(this.statecd, this.monthcd, this.yearcd).subscribe((data:any) =>{
          this.dataSource.data = data as CoEDetailsComponent[];
          console.log( this.dataSource.data, 'SaveData');
        });
      
      };
      
      
      
      GetYearmaster() { 
        this.adminservicesService.getyearmaster().subscribe((resultuser:any) =>{
          this.Selectyeardata =resultuser ;
          console.log(this.Selectyeardata, 'users');
          this.selectyear = '';
        });
      
      };
      


  
      
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
      
           


      
  

PostComponentselectionmaster()
{

this.addcomponentselection.State_Code=this.statecd;
this.addcomponentselection.Financial_Year= this.yearcd
this.addcomponentselection.Component_Code= "A074c";
this.addcomponentselection.Category= this.addcomponentselection.Category;
this.addcomponentselection.SubCategory1=this.addcomponentselection.SubCategory1;
this.addcomponentselection.SubCategory2=this.addcomponentselection.SubCategory2;
this.addcomponentselection.SubCategory3=this.addcomponentselection.SubCategory3;
this.addcomponentselection.Component_Name="demo";


this.adminservicesService.PostSelectioncompoenenetmaster(this.choicecd,this.addcomponentselection).subscribe((result: any) => {
  this.updatedistrictmaster = result;
  console.log(this.updatedistrictmaster, 'postdistrictmaster');   
  alert("Data IS Approved Sucessfully!!!");

  this.getcoedetailsentry(); 

});

}

      
  

UpdateCoedeatilsentry(data:any)
{

this.addcoedetailsmaster.CoEName= data.CoEName;
this.addcoedetailsmaster.Nodemonstration=  data.Nodemonstration;
this.addcoedetailsmaster.Technologies= data.Technologies;
this.addcoedetailsmaster.SourceTechnologies= data.SourceTechnologies;
this.addcoedetailsmaster.StatusofCoE=data.StatusofCoE;
this.addcoedetailsmaster.CalendarTrainings=data.CalendarTrainings;
this.addcoedetailsmaster.NoFarmers=data.NoFarmers
this.addcoedetailsmaster.NoTrainers= data.NoTrainers;
this.addcoedetailsmaster.Plants=data.Plants;
this.addcoedetailsmaster.seedlings=data.seedlings;
this.addcoedetailsmaster.Quantity=data.Quantity;
this.addcoedetailsmaster.Income=data.Income;
this.addcoedetailsmaster.Expenditure=data.Expenditure;
this.addcoedetailsmaster.Remarks=data.remarks;


this.adminservicesService.UpdatecoEdetails(this.addcoedetailsmaster).subscribe((result: any) => {
  this.updatedistrictmaster = result;
  console.log(this.updatedistrictmaster, 'Updatecoedetails');   
  alert("Data IS Approved Sucessfully!!!");

  this.getcoedetailsentry(); 

});

}


DeleteCoeDetailsmaster(data:any)
{


  this.adminservicesService.DeleteCoeDetailsmaster(data.coeid).subscribe((result: any) => {
    this.updatedistrictmaster = result;
    console.log(this.updatedistrictmaster, 'Delete district');   
    alert("Data IS Deleted Sucessfully!!!");

this.getcoedetailsentry();


  });
}




ClearAllDATA()
{

this.addcomponentselection.State_Code="";
this.addcomponentselection.Financial_Year="";
this.addcomponentselection.Component_Code="";

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
        this.getcoedetailsentry();
      }
    



}
