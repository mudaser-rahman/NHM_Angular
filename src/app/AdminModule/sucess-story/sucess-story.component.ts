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

@Component({
  selector: 'app-sucess-story',
  templateUrl: './sucess-story.component.html',
  styleUrls: ['./sucess-story.component.css'],
})
export class SucessStoryComponent {
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

  statecd = '';
  kon = '';
  villagecd: string = '';
  district_code: string = '';
  district_name: string = '';
  distname_ll: string = '';
  yearcd: string = '';

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

  Selectsubcategorymaster2: any = [];
  selectsubcategory2: string = '';

  selectsubcategorymaster3: any = [];
  selectsubcategory3: string = '';

  categoryid: string = '';
  subcategoryid: string = '';
  subcatgoryid2: string = '';

  subcategoryid3: string = '';

  selectcomponent: any = [];
  componentmaster: string = 'default';

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

      component: new FormControl('', [Validators.required]),
      beneficeary: new FormControl('', [Validators.required]),
      costofcultivation: new FormControl('', [Validators.required]),
      yield: new FormControl('', [Validators.required]),
      NetIncome: new FormControl('', [Validators.required]),
      costofton: new FormControl('', [Validators.required]),
      methodology: new FormControl('', [Validators.required]),
      cropname: new FormControl('', [Validators.required]),
      mobileno: new FormControl('', [Validators.required]),
      aadharno: new FormControl('', [Validators.required]),
      subsidy: new FormControl('', [Validators.required]),
      remarks: new FormControl('', [Validators.required]),

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

  getcomponentmaster(subcategory3id: string) {
    // alert("check village");

    this.adminservicesService
      .GetCopmponentmaster(this.subcategoryid3)
      .subscribe((result: any) => {
        this.selectcomponent = result;
        console.log(this.selectcomponent, 'getcomponentmaster');
        this.componentmaster = '';
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

  postSucessStoriesdata() {
    const formdata = new FormData();
    const formdata1 = new FormData();

    formdata.append('files', this.selectedFile);
    if (this.selectedFile && this.isValidFile(this.selectedFile) || this.SelectedFile1 && this.isValidFile(this.SelectedFile1)) {
      if (!this.validateFileSize(this.selectedFile)) {
        alert('File size under 200KB');
        return;
      }

      // formdata1.append('files2', this.SelectedFile1);
      formdata.append('files2', this.SelectedFile1);
        if (!this.validateFileSize(this.SelectedFile1)) {
          alert('File size under 200KB');
          return;
        }

        this.addsucessstories.Scode = this.statecd;
        this.addsucessstories.DCode = this.distcd;
        this.addsucessstories.BCode = this.mandalcd;
        this.addsucessstories.VCode = this.villagecd;
        this.addsucessstories.FarmerName = this.addsucessstories.FarmerName;
        this.addsucessstories.FatherName = this.addsucessstories.FatherName;
        this.addsucessstories.Contact = this.addsucessstories.Contact;
        this.addsucessstories.Crop = this.addsucessstories.Crop;
        this.addsucessstories.Technology = this.addsucessstories.Technology;
        this.addsucessstories.TotalCostByNormal =
          this.addsucessstories.TotalCostByNormal;
        this.addsucessstories.TotalCostByAdopting =
          this.addsucessstories.TotalCostByAdopting;
        this.addsucessstories.YieldByNormal =
          this.addsucessstories.YieldByNormal;
        this.addsucessstories.YieldByAdopting =
          this.addsucessstories.YieldByAdopting;
        this.addsucessstories.CostTonByNormal =
          this.addsucessstories.CostTonByNormal;
        this.addsucessstories.CostTonByAdopting =
          this.addsucessstories.CostTonByAdopting;
        this.addsucessstories.MethodologyByNormal =
          this.addsucessstories.MethodologyByNormal;
        this.addsucessstories.MethodologyByAdopting =
          this.addsucessstories.MethodologyByAdopting;
        this.addsucessstories.NetIncomeByNormal =
          this.addsucessstories.NetIncomeByNormal;
        this.addsucessstories.NetIncomeByAdopting =
          this.addsucessstories.NetIncomeByAdopting;
          this.addsucessstories.PhotofileName="";
          this.addsucessstories.PhotofilePath="";
          this.addsucessstories.LandfileName='';
          this.addsucessstories.LandfilePath='';

          
          formdata.append('model', JSON.stringify(this.addsucessstories));
        this.adminservicesService
          .PostSucessstories(formdata)
          .subscribe((result: any) => {
            // this.updatedistrictmaster = result;

            
            console.log(result, 'postdistrictmaster');
            alert('Data IS Approved Sucessfully!!!');


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
