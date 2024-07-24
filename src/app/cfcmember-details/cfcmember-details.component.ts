import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { CfcDetails } from '../Model/cfc-details';
import { MemberDetails } from '../Model/member-details';
import { Subscription } from 'rxjs';
import { LocationService } from '../Services/location.service';
import { CfcDetailsService } from '../Services/cfc-details.service';
import { CasteMaster } from '../Model/caste-master';
import { ProfessionMaster } from '../Model/profession-master';
import { StateMaster } from '../Model/state-master';
import { DistrictMaster } from '../Model/district-master';
import Swal from 'sweetalert2';
import { EncryptionService } from '../Services/encryption-service.service';

@Component({
  selector: 'app-cfcmember-details',
  templateUrl: './cfcmember-details.component.html',
  styleUrls: ['./cfcmember-details.component.css']
})
export class CFCMemberDetailsComponent {
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
  showDl: boolean = false;
  showPassport: boolean = false;
  showVoterId: boolean = false;
  showAdharLinkedNo: boolean = false;
  isAddPresident: boolean = false;
  showDropdown: string = '';
  showUpdateForm: boolean = true;
  showLogin: boolean = true;
  showCfcData: boolean = false;
  isSucess: boolean = false;
  CfcId: string = "";
  CfcName?: string = "";
  doesNotExists: string = "";
  stateArr: StateMaster[] = [];
  districtArr: DistrictMaster[] = [];
  castArr: CasteMaster[] = [];
  professionArr: ProfessionMaster[] = [];
  cfcArr: string = '';
  cfcDetails: CfcDetails = new CfcDetails();
  professionMaster: ProfessionMaster = new ProfessionMaster();
  casteMaster: CasteMaster = new CasteMaster();
  memberDetails: MemberDetails = new MemberDetails();
  memberDetailForm: FormGroup;
  formSubscription: Subscription;
  maxDate: any;
  constructor(private router: Router, private locationService: LocationService, 
    private cfcDetailsService: CfcDetailsService, private formBuilder: FormBuilder, private encryptionServices: EncryptionService) {

    this.memberDetailForm = this.formBuilder.group({
      memberName: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z- ]*')]),
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
    this.formSubscription = this.memberDetailForm.get('states')!.valueChanges.subscribe((newValue) => {
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
    return this.memberDetailForm.get(controlName)!.hasError(errorName);
  };
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
    const emptyMemberDetails = new MemberDetails();
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
    this.showCfcData = true;
    this.cfcDetailsService.getCfcMember(this.CfcId).subscribe((data) => {
      if (data) {
        this.memberDetails = data as MemberDetails;
        this.memberDetails.aadharNo = this.encryptionServices.decryptionAES(this.memberDetails.aadharNo);
        this.isAddPresident = false;
      } else {
        this.memberDetails = emptyMemberDetails;
      }
    },
      (error) => {
        if (error.status === 404) {
          this.memberDetails = emptyMemberDetails;
          this.isAddPresident = true;
        }
      })
  }
  saveAndExit(num: number) {
    this.memberDetailForm.markAllAsTouched();
    if (this.memberDetailForm.invalid) {
      return;
    }
    const currentYear = new Date().getFullYear();
    const lastTwoDigits = currentYear % 100;

    this.memberDetails.yearCode = lastTwoDigits.toString();
    this.memberDetails.cfcId = this.cfcDetails.cfcId;
    this.memberDetails.isDeleted = false;
    const year = new Date(this.memberDetails.dateOfBirth).getFullYear();
    const month = (new Date(this.memberDetails.dateOfBirth).getMonth() + 1).toString().padStart(2, '0');
    const day = new Date(this.memberDetails.dateOfBirth).getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    this.memberDetails.dateOfBirth = formattedDate;
    this.memberDetails.aadharNo = this.encryptionServices.encryptionAES(this.memberDetails.aadharNo);
    this.cfcDetailsService.postCfcMember(this.memberDetails).subscribe((data) => {
      this.memberDetails.aadharNo = this.encryptionServices.decryptionAES(this.memberDetails.aadharNo);
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
        this.memberDetailForm.reset();
        if (num == 1) {
          this.router.navigate(['empty']);
        }
      } else {
        alert("Something Problem")
      }
    });
  }

  reset() {
    this.memberDetailForm.reset();
  }

  cancel() {
    this.router.navigate(['empty']);
  }
}


