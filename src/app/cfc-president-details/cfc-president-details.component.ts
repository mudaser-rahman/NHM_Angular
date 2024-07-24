import { ChangeDetectorRef, Component, ViewChild, booleanAttribute } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { StateMaster } from '../Model/state-master';
import { LocationService } from '../Services/location.service';
import { CfcDetailsService } from '../Services/cfc-details.service';
import { CfcDetails } from '../Model/cfc-details';
import { Subscription } from 'rxjs';
import { DistrictMaster } from '../Model/district-master';
import { ProfessionMaster } from '../Model/profession-master';
import { CasteMaster } from '../Model/caste-master';
import { PresidentDetails } from '../Model/president-details';
import Swal from 'sweetalert2';
import { EncryptionService } from '../Services/encryption-service.service';

@Component({
  selector: 'app-cfc-president-details',
  templateUrl: './cfc-president-details.component.html',
  styleUrls: ['./cfc-president-details.component.css']
})
export class CfcPresidentDetailsComponent {
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
  showDl: boolean = false;
  showPassport: boolean = false;
  showVoterId: boolean = false;
  showAdharLinkedNo: boolean = false;
  showDropdown: string = '';
  showUpdateForm: boolean = true;
  showLogin: boolean = true;
  showCfcData: boolean = false;
  isSucess: boolean = false;
  CfcId: string = "";
  CfcName?: string = "";
  doesNotExists: string = "";
  isAddPresident: boolean = false;
  stateArr: StateMaster[] = [];
  districtArr: DistrictMaster[] = [];
  castArr: CasteMaster[] = [];
  professionArr: ProfessionMaster[] = [];
  cfcArr: string = '';
  cfcDetails: CfcDetails = new CfcDetails();
  professionMaster: ProfessionMaster = new ProfessionMaster();
  casteMaster: CasteMaster = new CasteMaster();
  presidentDetails: PresidentDetails = new PresidentDetails();
  presedentDetailForm: FormGroup;
  formSubscription: Subscription;
  maxDate: any;
  constructor(private router: Router, private locationService: LocationService, private cfcDetailsService: CfcDetailsService,
     private formBuilder: FormBuilder, private encryptionServices: EncryptionService,private cdr: ChangeDetectorRef) {
    this.presedentDetailForm = this.formBuilder.group({
      presidentName: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z- ]*')]),
      relationName: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z- ]*')]),
      states: new FormControl('', [Validators.required]),
      districts: new FormControl('', [Validators.required]),
      pinCode: new FormControl('', [Validators.required, Validators.maxLength(6), Validators.pattern('[0-9]*')]),
      mobileNo: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern('[0-9]*')]),
      emailId: new FormControl('', [Validators.required, Validators.maxLength(75), Validators.email]),
      dob: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      whichCast: new FormControl('', [Validators.required]),
      isPersonDisability: new FormControl(false, [Validators.required]),
      mainProfession: new FormControl('', [Validators.required]),
      adharNo: new FormControl('', [Validators.required, Validators.maxLength(12), Validators.pattern('[0-9]*')]),
    });
    this.formSubscription = this.presedentDetailForm.get('states')!.valueChanges.subscribe((newValue) => {
      // this.stateCode= newValue;
      // alert(this.stateCode);
      this.getDistrict(newValue);
    });
  }

  ngOnInit() {
    this.getState();
    this.getCast();
    this.getProfessions();
    this.maxDate = new Date();
    if(this.encryptionServices.checkLogin() == false){
      this.router.navigate(['login']);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.presedentDetailForm.get(controlName)!.hasError(errorName);
  };

  getState() {
    this.locationService.getStates().subscribe((data) => {
      this.stateArr = data as StateMaster[];
      // this.getDistrict(this.stateArr[0].stateCode);
    })
  }
  getDistrict(stateCode: string) {
    this.locationService.getDistrictByState(stateCode).subscribe((data) => {
      this.districtArr = data as DistrictMaster[];
      console.log(this.districtArr);
    })
  }

  showCfc() {
    this.isAddPresident = false;
    this.doesNotExists = "";
    this.CfcName = "";
    this.showCfcData = false;
    if (this.CfcId == '') {
      alert("Please enter CFC ID");
      return;
    }
    if(this.CfcId.length >13){
      alert("CFC ID should be under 13 digit");
      return;
    }
    const emptyCfcDetails = new PresidentDetails();
    this.cfcDetailsService.getCfcMaster(this.CfcId).subscribe((data) => {
      this.cfcDetails = data as CfcDetails;
      // console.log("obj",this.cfcDetails.cfcName);
      if (this.cfcDetails != null || this.cfcDetails != '') {
        this.CfcId = this.cfcDetails.cfcId;
        this.CfcName = this.cfcDetails.cfcName;
      }
    },
      (error) => {
        if (error.status === 404) {
          // Handle "No Content" response
          // console.log('No content found.');
          this.doesNotExists = "CFC Doesn't Exists";
          this.showCfcData = false;
          return;
        }
      })
    if (this.CfcId == null || this.CfcId == '') {
      this.doesNotExists = "CFC Doesn't Exists";
      return;
    }
    // console.log("name",this.CfcName);
    // console.log("obj",this.cfcDetails);

    this.showCfcData = true;
    this.cfcDetailsService.getCfcPresident(this.CfcId).subscribe((data) => {
      if (data) {
        this.presidentDetails = data as PresidentDetails;
        this.presidentDetails.aadharNo = this.encryptionServices.decryptionAES(this.presidentDetails.aadharNo);
        this.cdr.detectChanges();
        this.isAddPresident = false;
      } else {
        this.presidentDetails = emptyCfcDetails;
      }
    },
      (error) => {
        if (error.status === 404) {
          this.presidentDetails = emptyCfcDetails;
          this.isAddPresident = true;
        }
      })
  }


  saveAndExit(num: number) {
    this.presedentDetailForm.markAllAsTouched();
    if (this.presedentDetailForm.invalid) {
      return;
    }

    const currentYear = new Date().getFullYear();
    const lastTwoDigits = currentYear % 100;

    this.presidentDetails.yearCode = lastTwoDigits.toString();
    this.presidentDetails.cfcId = this.cfcDetails.cfcId;
    this.presidentDetails.isDeleted = false;
    this.presidentDetails.aadharNo = this.encryptionServices.encryptionAES(this.presidentDetails.aadharNo);
    const year = new Date(this.presidentDetails.dateOfBirth).getFullYear();
    const month = (new Date(this.presidentDetails.dateOfBirth).getMonth() + 1).toString().padStart(2, '0');
    const day = new Date(this.presidentDetails.dateOfBirth).getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    this.presidentDetails.dateOfBirth = formattedDate;
    this.cfcDetailsService.postCfcPresident(this.presidentDetails).subscribe((data) => {
      this.presidentDetails.aadharNo = this.encryptionServices.decryptionAES(this.presidentDetails.aadharNo);
      this.isSucess = data as boolean;
      if (this.isSucess == true) {
        if (this.isAddPresident) {
          Swal.fire({
            icon: 'success',
            text: 'Details Added Successfully',
            allowOutsideClick: false
          });

        } else {
          Swal.fire({
            icon: 'success',
            text: 'Details Updated Successfully',
            allowOutsideClick: false
          });
        }
        this.presedentDetailForm.reset();
        if (num == 1) {
          this.router.navigate(['empty']);
        }
      } else {
        alert("Something Problem");
      }
    });
  }

  getCast() {
    this.locationService.GetCastMaster().subscribe((data) => {
      this.castArr = data as CasteMaster[];
    })
  }

  getProfessions() {
    this.locationService.GetProfession().subscribe((data) => {
      this.professionArr = data as ProfessionMaster[];
    })
  }

  reset() {
    this.presedentDetailForm.reset();
  }
  cancel() {
    this.router.navigate(['empty']);
  }

}

