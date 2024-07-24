import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocationService } from '../Services/location.service';
import { StateMaster } from '../Model/state-master';
import { DistrictMaster } from '../Model/district-master';
import { BlockMaster } from '../Model/block-master';
import { PanchayatMaster } from '../Model/panchayat-master';
import { TahsilMaster } from '../Model/tahsil-master';
import { VillageMaster } from '../Model/village-master';
import { AgreOffice } from '../Model/agre-office';
import { CfcMaster } from '../Model/cfc-master';
import { CfcDetails } from '../Model/cfc-details';
import { CfcDetailsService } from '../Services/cfc-details.service';
import Swal from 'sweetalert2';
import { EncryptionService } from '../Services/encryption-service.service';
// import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-cfcdetails',
  templateUrl: './cfcdetails.component.html',
  styleUrls: ['./cfcdetails.component.css']
})
export class CFCDetailsComponent {
  showLogin: boolean = true;
  showCfcData: boolean = false;
  cfcDetailValidateForm: FormGroup;
  formSubscription: Subscription;
  cfcName?: string = "";
  stateCode: string = "";
  distCode: string = "";
  blockCode: string = "";
  panchayatCode: string = "";
  talukCode: string = "";
  villageCode: string = "";
  stateArr: StateMaster[] = [];
  districtArr: DistrictMaster[] = [];
  blockArr: BlockMaster[] = [];
  panchayatArr: PanchayatMaster[] = [];
  tahsilArr: TahsilMaster[] = [];
  villageArr: VillageMaster[] = [];
  agreOfficeArr: AgreOffice[] = [];
  cfcMasterArr: CfcMaster[] = [];
  isCfcExists: string = "";
  cfcDetails: CfcDetails = new CfcDetails();
  constructor(private router: Router, private formBuilder: FormBuilder, private locationService: LocationService, private cfcDetailsService: CfcDetailsService,
    private encryptServices:EncryptionService) {
    this.cfcDetailValidateForm = this.formBuilder.group({
      nameOfCFC: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      block: new FormControl('', [Validators.required]),
      panchayat: new FormControl('', [Validators.required]),
      tahsil: new FormControl('', [Validators.required]),
      village: new FormControl('', [Validators.required]),
      agriOfficer: new FormControl('', [Validators.required]),
      mobileNo: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern('[0-9]*')]),
      emailId: new FormControl('', [Validators.required, Validators.maxLength(75), Validators.email]),
      cfcId: new FormControl('', [Validators.maxLength(10), Validators.pattern('[0-9]*')]),
    })
    this.formSubscription = this.cfcDetailValidateForm.get('nameOfCFC')!.valueChanges.subscribe((newValue) => {
      this.cfcName = this.cfcMasterArr.find(e => e.cfcCode == newValue)?.cfcName;
      this.cfcDetails.cfcName = this.cfcName;
      console.log(this.cfcName);
    });
    this.formSubscription = this.cfcDetailValidateForm.get('state')!.valueChanges.subscribe((newValue) => {
      this.stateCode = newValue;
      // alert(this.stateCode);
      this.getDistrict(newValue);
    });
    this.formSubscription = this.cfcDetailValidateForm.get('district')!.valueChanges.subscribe((newValue) => {
      this.distCode = newValue;
      this.getBlock(newValue);
      this.getThsil(newValue);
    });
    this.formSubscription = this.cfcDetailValidateForm.get('block')!.valueChanges.subscribe((newValue) => {
      this.blockCode = newValue;
      this.getPanchayat(newValue);
      this.getAgreOffice(newValue);
    });
    this.formSubscription = this.cfcDetailValidateForm.get('panchayat')!.valueChanges.subscribe((newValue) => {
      this.panchayatCode = newValue;
      this.getVillage(newValue);
    });
    this.formSubscription = this.cfcDetailValidateForm.get('tahsil')!.valueChanges.subscribe((newValue) => {
      this.talukCode = newValue;
    });
    this.formSubscription = this.cfcDetailValidateForm.get('village')!.valueChanges.subscribe((newValue) => {
      this.villageCode = newValue;
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.cfcDetailValidateForm.get(controlName)!.hasError(errorName);
  };

  // getCfcDetails(){
  //   this.showCfcData = true;
  //   this.showLogin= false;
  // }
  ngOnInit() {
    this.getState();
    this.getCfcmaster();
    if(this.encryptServices.checkLogin() == false){
      this.router.navigate(['login']);
    }
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

      this.getBlock(this.districtArr[0].districtCode);
      this.getThsil(this.districtArr[0].districtCode);
    })
  }
  getBlock(distCode: string) {
    this.locationService.getBlockByDistrict(distCode).subscribe((data) => {
      this.blockArr = data as BlockMaster[];
      this.getPanchayat(this.blockArr[0].blockCode);
      this.getAgreOffice(this.blockArr[0].blockCode);
    })
  }
  getPanchayat(blockCode: string) {
    this.locationService.GetPanchayatByBlock(blockCode).subscribe((data) => {
      this.panchayatArr = data as PanchayatMaster[];
      this.getVillage(this.panchayatArr[0].panchayatCode);
    })
  }
  getThsil(distCode: string) {
    this.locationService.GetTahsilByDistrict(distCode).subscribe((data) => {
      this.tahsilArr = data as TahsilMaster[];
    })
  }
  getVillage(panchCode: string) {
    this.locationService.GetVillageByPanchayat(panchCode).subscribe((data) => {
      this.villageArr = data as VillageMaster[];
    })
  }
  getAgreOffice(blockCode: string) {
    this.locationService.GetAgreOffiiceByBlock(blockCode).subscribe((data) => {
      this.agreOfficeArr = data as AgreOffice[];
    })
  }
  getCfcmaster() {
    this.locationService.getCfcMaster().subscribe((data) => {
      this.cfcMasterArr = data as CfcMaster[];
    })
  }


  reset() {
    this.cfcDetailValidateForm.reset();
  }

  saveAndExit(num: number) {
    this.isCfcExists = "";
    this.cfcDetailValidateForm.markAllAsTouched();
    if (this.cfcDetailValidateForm.invalid) {
      return;
    }
    this.cfcDetails.isDeleted = false;
    console.log(this.cfcDetails);
    this.cfcDetailsService.postCfcDetails(this.cfcDetails).subscribe((data) => {
      console.log(data, "re");
      this.isCfcExists = String(JSON.parse(data as string));
      console.log(this.isCfcExists, "re");
      if (this.isCfcExists == "false") {
        Swal.fire({
          icon: 'error',
          text: 'CFC Id Already exists. Use different One !',
          allowOutsideClick: false
        });
        return;
        // alert("CFC Id Already exists. Use different One !")
      }
      else {
        Swal.fire({
          icon: 'success',
          text: 'Your Id : ' + this.isCfcExists,
          allowOutsideClick: false
        });
        // alert("added");
      }

      if (num == 1) {
        this.router.navigate(['empty']);
      }
    })

  }

  cancel() {
    this.router.navigate(['empty']);
  }

}
