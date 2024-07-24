import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AddDistrictmaster } from 'src/app/Model/adddistrictmaster';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AdminservicesService } from 'src/app/Services/adminservices.service';
import { MatTableDataSource } from '@angular/material/table';
import { Beneficearydetails } from 'src/app/Model/Beneficearydetails';
import { Sucessstories } from 'src/app/Model/Sucessstories';
import { Projectdetails } from 'src/app/Model/Projectdetails';

@Component({
  selector: 'app-project-entry',
  templateUrl: './project-entry.component.html',
  styleUrls: ['./project-entry.component.css']
})
export class ProjectEntryComponent {
  message :string="";
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
  mandalcd: string = '';

  btnedit = false;
  btnupdate = false;

  public dataSource = new MatTableDataSource<Beneficearydetails>();
  //adddistrictmaster: AddDistrictmaster = new AddDistrictmaster();

  addsucessstories: Sucessstories = new Sucessstories();
  addbeneficearydetails: Beneficearydetails = new Beneficearydetails();

  addprojectdetails :Projectdetails = new Projectdetails();

  statecd = '';
  kon = '';
  villagecd: string = '';
  district_code: string = '';
  district_name: string = '';
  distname_ll: string = '';
  yearcd: string = '';
  statuscd:string='';
  unitscd:string='';
  remarks:string='';

  componentid: string = '';

  updatedistrictmaster: any[] = [];
  districtmaster: string = 'default';

  deletedistrictdata: any = [];
  deletedistmaster: string = 'default';

  selectUserType: any = [];
  selectuser: string = '';

  selectdistrictdata: any = [];
  selectdistrict: string = 'default';

  selectmandalmaster: any = [];
  selectmandal: string = 'default';

  Selectyeardata: any = [];
  selectyear: string = '';

  selectstatemaster: any = [];
  statemaster: string = '';

  SelectVillagemaster: any = [];
  selectvillage: string = '';

  selectpcatgorymaster: any = [];
  selectcategory: string = '';

  SelectPsubcatgorydata: any = [];
  Selectpsubcategory: string = '';


  
  SelectUnitsdata: any = [];
  selectunits: string = '';

  Selectstatusdata: any = [];
  selectstatus: string = '';



  categoryid: string = '';
  subcategoryid: string = '';
  subcatgoryid2: string = '';

  subcategoryid3: string = '';

 

  selectedFile!: File;
  SelectedFile1!: File;

  jwtHelper: any;
  localStorage: any;
  isUserAuthenticated: any;

  formValidate: FormGroup;

  adddistrictmaster: AddDistrictmaster = new AddDistrictmaster();
  formSubscription: Subscription | undefined;
  input: any;
  displayedColumns: string[] = [
    'slNo',
    'Years',
    'State',
    'noOfBeneficiary',
    'Action',
  ];
  inputElement: HTMLInputElement | undefined;

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private adminservicesService: AdminservicesService
  ) {
    this.formValidate = this.formBuilder.group({
      state: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      mandal: new FormControl('', [Validators.required]),
      village: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      subcategory: new FormControl('', [Validators.required]),
      subcategory2: new FormControl('', [Validators.required]),
      subcategory3: new FormControl('', [Validators.required]),

      Beneficeary: new FormControl('', [Validators.required]),
      projectcode: new FormControl('', [Validators.required]),
      sanctiondate: new FormControl('', [Validators.required]),
      Address: new FormControl('', [Validators.required]),
      projectcost: new FormControl('', [Validators.required]),
      costofton: new FormControl('', [Validators.required]),
      methodology: new FormControl('', [Validators.required]),
      cropname: new FormControl('', [Validators.required]),
      mobileno: new FormControl('', [Validators.required]),
      aadharno: new FormControl('', [Validators.required]),
      subsidy: new FormControl('', [Validators.required]),
      remarks: new FormControl('', [Validators.required]),
      capacity: new FormControl('', [Validators.required]),
      Units: new FormControl('', [Validators.required]),
      Status: new FormControl('', [Validators.required]),


      technology: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.getstatemaster();
  }

  public hasError = (controlName: string, errorName: string) => {
    // return this.formValidate.get(controlName)!.hasError(errorName);
    return this.formValidate.get(controlName)!.hasError(errorName);
  };

  getstatemaster() {
    this.adminservicesService
      .GetStatemaster()
      .subscribe((resultdistrictmaster) => {
        this.selectUserType = resultdistrictmaster;

        console.log(this.selectUserType, 'statemaster');
      });
  }

  Getdistictmaster(statecd: string) {
    this.adminservicesService
      .Getlgdistrictmaster(this.statecd)
      .subscribe((resultuser: any) => {
        this.selectdistrictdata = resultuser;
        console.log(this.selectdistrictdata, 'users');
        this.selectdistrict = '';
      });
  }

  GetYearmaster() {
    this.adminservicesService.getyearmaster().subscribe((resultuser: any) => {
      this.Selectyeardata = resultuser;
      console.log(this.Selectyeardata, 'users');
      this.selectyear = '';
    });
  }

  GetMandalmaster(statecd: string, distcd: string) {
    //https://localhost:7107/api/Adminapi/bindscheme?deptcd=01&kon=19

    this.adminservicesService
      .getmandlmaster(this.statecd, this.distcd)
      .subscribe((resultuser: any) => {
        this.selectmandalmaster = resultuser;
        console.log(this.selectmandalmaster, 'mandal');
        this.selectmandal = '';
      });
  }

  GetVillagemaster() {
    this.adminservicesService
      .GetVillage(this.statecd, this.distcd, this.mandalcd)
      .subscribe((resultuser: any) => {
        this.SelectVillagemaster = resultuser;
        console.log(this.SelectVillagemaster, 'village');
        this.selectvillage = '';
      });
  }


GetProjectcategory()
{


  this.adminservicesService.GetProjectcatgory().subscribe((resultuser: any) => {
    this.selectpcatgorymaster = resultuser;
    console.log(this.selectpcatgorymaster, 'pcatgory');
    this.selectcategory = '';
  });
}


GetProjectsubcategory()
{


  this.adminservicesService.GetProjectSubcategory(this.categoryid).subscribe((resultuser: any) => {
    this.SelectPsubcatgorydata = resultuser;
    console.log(this.SelectPsubcatgorydata, 'Psubcatgory');
    this.Selectpsubcategory = '';
  });
}


GetUnits ()
{

  this.adminservicesService.GetUnits().subscribe((resultuser: any) => {
    this.SelectUnitsdata = resultuser;
    console.log(this.SelectUnitsdata, 'Units');
    this.selectunits = '';
  });
}

GetStatus()
{

  
  this.adminservicesService.GetStatus().subscribe((resultuser: any) => {
    this.Selectstatusdata = resultuser;
    console.log(this.Selectstatusdata, 'Status');
    this.selectstatus = '';
  });

}


  






  GetBeneficearydetails() {
    this.adminservicesService
      .GetAllBeneficearydata(this.statecd, this.yearcd)
      .subscribe((data: any) => {
        this.dataSource.data = data as Beneficearydetails[];
        console.log(this.data, 'SaveData');
      });
  }

  isValidFile(file: File | undefined): boolean {
    if (!file) {
      return false;
    }
    const allowedExtensions = ['jpg', 'png'];
    const extension = (file.name.split('.').pop() || '').toLowerCase();
    return allowedExtensions.includes(extension);
  }

  private validateFileSize(file: File): boolean {
    const maxSize = 2000 * 1024; //200KB
    return file.size <= maxSize;
  }

  PostProjectentrydetails() {
    const formdata = new FormData();
    const formdata1 = new FormData();

    formdata.append('files', this.selectedFile);
    if (this.selectedFile && this.isValidFile(this.selectedFile) || this.SelectedFile1 && this.isValidFile(this.SelectedFile1)) {
      if (!this.validateFileSize(this.selectedFile)) {
        alert('File size under 200KB');
        return;
      }


this.addprojectdetails.PCode=  this.addprojectdetails.PCode;
this.addprojectdetails.SCode= this.statecd;
this.addprojectdetails.DCode= this.distcd;
this.addprojectdetails.Date_Sanction=  this.addprojectdetails.Date_Sanction;
this.addprojectdetails.Category= this.categoryid
this.addprojectdetails.SubCategory=  this.subcategoryid;
this.addprojectdetails.Beneficiary= this.addprojectdetails.Beneficiary;
this.addprojectdetails.Address= this.addprojectdetails.Address;
this.addprojectdetails.Project_Cost= this.addprojectdetails.Project_Cost;
this.addprojectdetails.Capacity= this.addprojectdetails.Capacity;
this.addprojectdetails.Unit= this.unitscd;
this.addprojectdetails.Status= this.statuscd;
this.addprojectdetails.Remarks= this.addprojectdetails.Remarks;
     
          formdata.append('model', JSON.stringify(this.addprojectdetails));
        this.adminservicesService
          .PostProjectdetailsEntry(formdata)
          .subscribe((result: string) => {
            alert(result);
            //this.message = String(JSON.stringify(result as string));

            // this.updatedistrictmaster = result;
            console.log(result, 'postdistrictmaster');
            ///(this.message);


            this.Getdistictmaster(this.statecd);
          });
    } else {
      alert('Please select a valid JPG file.');
    }
  }




  Updatedistrictmasterdata(data: any) {
    this.adddistrictmaster.DistrictCode = data.distcd;
    this.adddistrictmaster.DistrictName = data.distname;

    this.adminservicesService
      .updatedistrictmaster(this.distcd, this.adddistrictmaster)
      .subscribe((result: any) => {
        this.updatedistrictmaster = result;
        console.log(this.updatedistrictmaster, 'Update district');
        alert('Data IS Approved Sucessfully!!!');

        this.Getdistictmaster(this.statecd);
      });
  }

  Deletedistrictmaster(item: any) {
    this.adddistrictmaster.DistrictCode = this.distcd;

    this.adminservicesService
      .deletedistrctmaster(this.distcd)
      .subscribe((result: any) => {
        this.updatedistrictmaster = result;
        console.log(this.updatedistrictmaster, 'Delete district');
        alert('Data IS Deleted Sucessfully!!!');

        this.Getdistictmaster(this.statecd);
      });
  }

  edit(item: any) {
    // this.btnedit=true;
    // if(this.btnupdate= false)
    // {
    //   this.btnupdate=true;
    //   this.btnedit=false;
    // }

    item.editable = !item.editable;
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

  onFileselected(event: Event) {
    this.inputElement = event.target as HTMLInputElement;

    if (this.inputElement.files && this.inputElement.files.length > 0) {
      this.selectedFile = this.inputElement.files[0];
      if (!this.isValidFile(this.selectedFile)) {
        alert('Invalid file type. Please select a PDF, JPG or PNG file.');
        this.inputElement.value = ''; // Clear the file input
        this.selectedFile = null!;
      }
    }
  }

  onFileselected2(event: Event) {
    this.inputElement = event.target as HTMLInputElement;

    if (this.inputElement.files && this.inputElement.files.length > 0) {
      this.SelectedFile1 = this.inputElement.files[0];
      if (!this.isValidFile(this.SelectedFile1)) {
        alert('Invalid file type. Please select a PDF, JPG or PNG file.');
        this.inputElement.value = ''; // Clear the file input
        this.SelectedFile1 = null!;
      }
    }
  }
}
