import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AddDistrictmaster } from 'src/app/Model/adddistrictmaster';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AdminservicesService } from 'src/app/Services/adminservices.service';
import { MatTableDataSource } from '@angular/material/table';
import { ComponentSelectionmaster } from 'src/app/Model/Componentseelction';
import { ComponentAchievment } from 'src/app/Model/ComponentAchievment';
import { Projectdetails } from 'src/app/Model/Projectdetails';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent {

  
  
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

  public dataSource = new MatTableDataSource<ComponentAchievment>();
  //adddistrictmaster: AddDistrictmaster = new AddDistrictmaster();

addcomponentselection: ComponentSelectionmaster= new ComponentSelectionmaster();

addcomponentAchievment: ComponentAchievment= new ComponentAchievment();
addprojectdetails :Projectdetails = new Projectdetails();

  statecd = '';
  kon = '';
  district_code: string = '';
  district_name: string = '';
  distname_ll: string = '';
yearcd:string='';
choicecd:string='';

componentid:string='';

  updatedistrictmaster: any[] = [];
  districtmaster: string = 'default';

  Updateprojectdetails :any[]=[];
  projectdetails :string='default';

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
displayedColumns: string[] = ['slNo', 'componentcode', 'Category', 'subcatgory1', 'subcatgory2', 'subcatgory3','componentname', 'Action'];

  constructor(private http: HttpClient , private router:Router,  private formBuilder: FormBuilder, 
    private adminservicesService: AdminservicesService) {

      
    this.formValidate = this.formBuilder.group({
      choice: new FormControl('', [Validators.required] ),
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
          this.selectdistrictdata =resultuser ;
          console.log(this.selectdistrictdata, 'users');
          this.selectdistrict = '';
        });
      
      };
      
      
      
      GetYearmaster() { 
        this.adminservicesService.getyearmaster().subscribe((resultuser:any) =>{
          this.Selectyeardata =resultuser ;
          console.log(this.Selectyeardata, 'users');
          this.selectyear = '';
        });
      
      };
      

      GetODOFPAchievmentdata() {   
        this.adminservicesService.GetODOFPAchievmentmaster(this.statecd, this.distcd, this.yearcd).subscribe((data: any) => {
         
          this.dataSource.data = data as ComponentAchievment[];
          console.log( this.dataSource.data, 'SaveData');



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




          GetProjectDetails()
          {

            this.adminservicesService.GetProjectDetails(this.statecd, this.yearcd).subscribe((result: any) => {
              this.data = result;
              console.log(this.data, 'Projectdetails');
            });


          }
      
           


      
  PostODOFPAchievmentmastermaster()
{

this.addcomponentAchievment.State_Code=this.statecd;
this.addcomponentAchievment.District_Code= this.distcd;
this.addcomponentAchievment.Financial_Year= this.yearcd
this.addcomponentselection.Component_Code=  this.addcomponentAchievment.Component_Code;
this.addcomponentselection.Category= this.addcomponentselection.Category;
this.addcomponentselection.SubCategory1=this.addcomponentselection.SubCategory1;
this.addcomponentselection.SubCategory2=this.addcomponentselection.SubCategory2;
this.addcomponentselection.SubCategory3=this.addcomponentselection.SubCategory3;
this.addcomponentselection.Component_Name="demo";
this.addcomponentAchievment.PA= this.addcomponentAchievment.PA;
this.addcomponentAchievment.FA= this.addcomponentAchievment.FA;
this.addcomponentAchievment.Remarks= this.addcomponentAchievment.Remarks;


this.adminservicesService.PostODOFPAchievmentmaster(this.addcomponentAchievment).subscribe((result: any) => {
  this.updatedistrictmaster = result;
  console.log(this.updatedistrictmaster, 'PostODOFPAchievment');   
  alert("Data IS Approved Sucessfully!!!");

  this.Getdistictmaster(this.statecd); 

});

}



ClearAllDATA()
{

this.addcomponentselection.State_Code="";
this.addcomponentselection.Financial_Year="";
this.addcomponentselection.Component_Code="";

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
    

    


      UpdateProjectDetails(item:any)
      {

        this.addprojectdetails.Project_Cost= item.project_Cost;
        this.addprojectdetails.Subsidy= item.subsidy;
        this.addprojectdetails.Capacity= item.capacity;
        this.addprojectdetails.Unit= item.unit;
        this.addprojectdetails.Status= item.status;
        this.addprojectdetails.Remarks=  item.remarks;
        this.addprojectdetails.SNo=item.sNo;

        this.adminservicesService.UpdateProjectdetails(this.addprojectdetails).subscribe((result: string) => {
         // this.Updateprojectdetails = result;
          console.log(this.Updateprojectdetails, 'Updateprojectdetails');   
          const id = String(JSON.stringify(result as string))
          alert("Data IS Updated Sucessfully!!!"  + "id is" + id);
        
          this.getstatemaster(); 
        
        });
        

        
      }




}
