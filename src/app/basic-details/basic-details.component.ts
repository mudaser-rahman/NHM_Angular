import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { PresidentDetails } from '../Model/president-details';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConnectableObservable, Subscription, async, concatAll } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LocationService } from '../Services/location.service';
import { CfcDetailsService } from '../Services/cfc-details.service';
import { StateMaster } from '../Model/state-master';
import { DistrictMaster } from '../Model/district-master';
import { ProfessionMaster } from '../Model/profession-master';
import { CasteMaster } from '../Model/caste-master';
import { CfcDetails } from '../Model/cfc-details';
import { CdbBenificiaryMaster } from '../Model/cdb-benificiary-master';
import { CdbBenificaryMasterService } from '../Services/cdb-benificary-master.service';
import { BankMaster } from '../Model/bank-master';
import { BranchMaster } from '../Model/branch-master';
import { BankDetails } from '../Model/bank-details';
import { SoilTypes } from '../Model/soil-types';
import { MatTableDataSource } from '@angular/material/table';
import { IdentityTypesMaster } from '../Model/identity-types-master';
import { WaterSourceType } from '../Model/water-source-type';
import { OwnershipType } from '../Model/ownership-type';
import { LandDetails } from '../Model/land-details';
import { TahsilMaster } from '../Model/tahsil-master';
import { VillageMaster } from '../Model/village-master';
import { DocumentTypes } from '../Model/document-types';
import { BeneficiaryDocuments } from '../Model/beneficiary-documents';
import { SafeUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { BlockMaster } from '../Model/block-master';
import { PanchayatMaster } from '../Model/panchayat-master';
import { AgreOffice } from '../Model/agre-office';
import { CfcMaster } from '../Model/cfc-master';
import { HttpErrorResponse } from '@angular/common/http';
import { EncryptionService } from '../Services/encryption-service.service';

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.css']
})
export class BasicDetailsComponent {

  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
  private inputElement: HTMLInputElement | undefined;
  newRegister: boolean = false;
  showDl: boolean = false;
  showPassport: boolean = false;
  showVoterId: boolean = false;
  showAdharLinkedNo: boolean = false;
  isDocUploaded: boolean = false;
  isOneIdenetityDetailsFilled: boolean = false;
  showDropdown: string = '';
  stateCODE: string = '';
  distCode: string = '';
  blockCode: string = "";
  panchayatCode: string = "";
  talukCode: string = "";
  villageCode: string = "";
  cfcName?: string = "";
  BankCode: string = '';
  IFSC?: string = "";
  ViewDocument: string = "";
  beneficiaryId: string = "";
  // beneficiaryId: string = "231200100000039";
  beneficiaryIdForUpdate: string = "";
  doesNotExists: string = "";
  documentTypeId: number = 0;
  showUpdateForm: boolean = false;
  isIdentityDetailsPosted: boolean = false;
  showSpinner: boolean = false;
  stateArr: StateMaster[] = [];
  districtArr: DistrictMaster[] = [];
  tehsilArr: TahsilMaster[] = [];
  villageByteshilArr: VillageMaster[] = [];
  castArr: CasteMaster[] = [];
  professionArr: ProfessionMaster[] = [];
  bankmasterArr: BankMaster[] = [];
  branchMasterArr: BranchMaster[] = [];
  soilTypeArr: SoilTypes[] = [];
  waterSourceTyeArr: WaterSourceType[] = [];
  ownershipTypeArr: OwnershipType[] = [];
  landDetailsArr: LandDetails[] = [];
  documentTypesArr: DocumentTypes[] = [];
  allIdentitys: any[] = [];

  blockArr: BlockMaster[] = [];
  panchayatArr: PanchayatMaster[] = [];
  tahsilArr: TahsilMaster[] = [];
  villageArr: VillageMaster[] = [];
  agreOfficeArr: AgreOffice[] = [];
  cfcMasterArr: CfcMaster[] = [];
  selectedFile!: File;
  cfcArr: string = '';
  villageCodeFromTehsil: string = '';
  imageUrl: string | null = null;
  identityTypesMaster: IdentityTypesMaster[] = [];
  cfcDetailsArr: CfcDetails[] = [];

  cfcDetails: CfcDetails = new CfcDetails();
  professionMaster: ProfessionMaster = new ProfessionMaster();
  casteMaster: CasteMaster = new CasteMaster();
  bankDetails: BankDetails = new BankDetails();
  cdbBenificiaryMaster: CdbBenificiaryMaster = new CdbBenificiaryMaster();
  landDetails: LandDetails = new LandDetails();
  documentTypes: DocumentTypes = new DocumentTypes();
  document: BeneficiaryDocuments = new BeneficiaryDocuments();
  applicantDetailForm: FormGroup;
  bankDetailForm: FormGroup;
  landDetailsForm: FormGroup;
  cfcDetailValidateForm: FormGroup;
  formSubscription: Subscription;

  maxDate: any;

  isDataPosted: boolean = false;
  response: any;
  @ViewChild('iframe') iframe: ElementRef | undefined;

  constructor(private router: Router, private locationService: LocationService, private cdbBenificaryMasterService: CdbBenificaryMasterService,
    private formBuilder: FormBuilder, private cfcDetailsService: CfcDetailsService, private encryptionService: EncryptionService) {

    this.applicantDetailForm = this.formBuilder.group({
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
    this.formSubscription = this.applicantDetailForm.get('states')!.valueChanges.subscribe((newValue) => {
      this.stateCODE = newValue;
      this.getDistrict(newValue);
    });

    this.formSubscription = this.applicantDetailForm.get('districts')!.valueChanges.subscribe((newValue) => {
      this.distCode = newValue;
      this.getCfcByDist(newValue);
    });

    //Bank Details Form controller
    this.bankDetailForm = this.formBuilder.group({
      bank: new FormControl('', [Validators.required]),
      branch: new FormControl('', [Validators.required]),
      ifsc: new FormControl({ value: '', disabled: true }),
      accountNo: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.pattern('[0-9]*')]),
      associate: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(50)]),
      registerationNo: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.pattern('[a-zA-Z0-9 ]*')]),
      validity: new FormControl('', [Validators.required]),
    })

    this.formSubscription = this.bankDetailForm.get('bank')!.valueChanges.subscribe((newValue) => {
      this.BankCode = newValue;
      this.getBranch(newValue);
    });

    this.formSubscription = this.bankDetailForm.get('branch')!.valueChanges.subscribe((newValue) => {
      this.getIfsc(newValue);
    });

    //Land Details Form controller
    this.landDetailsForm = this.formBuilder.group({
      possed: new FormControl('', [Validators.required, Validators.maxLength(18)]),
      totalCoconutArea: new FormControl('', [Validators.required, Validators.maxLength(18)]),
      lodpScheme: new FormControl('', [Validators.required, Validators.maxLength(18)]),
      soilType: new FormControl('', [Validators.required]),
      waterSource: new FormControl('', [Validators.required]),
      surveyNo: new FormControl('', [Validators.required]),
      states: new FormControl('', [Validators.required]),
      districts: new FormControl('', [Validators.required]),
      tehsil: new FormControl('', [Validators.required]),
      village: new FormControl('', [Validators.required]),
      survayArea: new FormControl('', [Validators.required]),
      ownership: new FormControl('', [Validators.required]),
    });

    this.formSubscription = this.landDetailsForm.get('states')!.valueChanges.subscribe((newValue) => {

      this.getDistrict(newValue);
    });

    this.formSubscription = this.landDetailsForm.get('districts')!.valueChanges.subscribe((newValue) => {
      this.gatTehsil(newValue);
    });

    this.formSubscription = this.landDetailsForm.get('tehsil')!.valueChanges.subscribe((newValue) => {
      this.getVillageByTehsil(newValue);
    });

    this.formSubscription = this.landDetailsForm.get('village')!.valueChanges.subscribe((newValue) => {
      this.villageCodeFromTehsil = newValue;
    });

    this.cfcDetailValidateForm = this.formBuilder.group({
      nameOfCFC: new FormControl('', [Validators.required]),
      state: new FormControl({ value: '', disabled: true }),
      district: new FormControl({ value: '', disabled: true })
    })

    this.formSubscription = this.cfcDetailValidateForm.get('nameOfCFC')!.valueChanges.subscribe((newValue) => {
      this.cfcName = this.cfcMasterArr.find(e => e.cfcCode == newValue)?.cfcName;
      this.cfcDetails.cfcName = this.cfcName;
    });

  }
  public identityDataSource = new MatTableDataSource<IdentityTypesMaster>();
  displayedColumns: string[] = ['position1', 'position2'];
  ngOnInit() {
    this.getState();
    this.getCast();
    this.getProfessions();
    this.maxDate = new Date();
    if(this.encryptionService.checkLogin() == false){
      this.router.navigate(['login']);
    }
  }

  public hasError = (form: FormGroup, controlName: string, errorName: string) => {
    return form.get(controlName)!.hasError(errorName);
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
      this.getCfcByDist(this.districtArr[0].districtCode);
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
  gatTehsil(distCode: string) {
    this.locationService.GetTahsilByDistrict(distCode).subscribe((data) => {
      this.tehsilArr = data as TahsilMaster[];
      // this.getVillageByTehsil(this.tehsilArr[0].tahsilCode);
    })
  }

  getVillageByTehsil(tehsilCode: string) {
    this.locationService.GetVillageByTehsil(tehsilCode).subscribe((data) => {
      this.villageByteshilArr = data as VillageMaster[];
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
  getCfcmaster() {
    this.locationService.getCfcMaster().subscribe((data) => {
      this.cfcMasterArr = data as CfcMaster[];
    })
  }


  // CFC
  getCfcByDist(distCode: string) {
    this.cfcDetailsService.getCfcByDistrict(distCode).subscribe((data) => {
      this.cfcDetailsArr = data as CfcDetails[];
    })
  }

  //Identity tab
  getIdentitys() {
    this.cdbBenificaryMasterService.getIdentityTypes().subscribe((data) => {
      this.identityDataSource = new MatTableDataSource<IdentityTypesMaster>(data);
    })
  }

  //Bank Details

  getBanks() {
    this.cdbBenificaryMasterService.getBankByState(this.stateCODE).subscribe((data) => {
      this.bankmasterArr = data as BankMaster[];
    })
  }
  getBranch(bakCode: string) {
    this.cdbBenificaryMasterService.getBranchByDistrictAndBank(this.distCode, bakCode).subscribe((data) => {
      this.branchMasterArr = data as BranchMaster[];
    })
  }


  getIfsc(branch: string) {
    this.IFSC = this.branchMasterArr.find(e => e.branchCode === branch)?.ifscCode;
  }

  //Land Details
  getSoilTypes() {
    this.cdbBenificaryMasterService.getSoilTypes().subscribe((data) => {
      this.soilTypeArr = data as SoilTypes[];
    })
  }

  getWaterSourceTypes() {
    this.cdbBenificaryMasterService.getWaterSourceTypes().subscribe((data) => {
      this.waterSourceTyeArr = data as WaterSourceType[];
    })
  }

  getOwnershipTypes() {
    this.cdbBenificaryMasterService.getOwnershipTypes().subscribe((data) => {
      this.ownershipTypeArr = data as OwnershipType[];
    })
  }

  getCoconutVerity() {
    this.cdbBenificaryMasterService.getCoconutVerity().subscribe((data) => {
      this.landDetailsArr = data as LandDetails[];
    })
  }

  calculateAverage(item: LandDetails) {
    item.totalNoPalms = Number(item.yielding) + Number(item.nonYielding);
  }



  // Upload Documents Codes
  getDocumentTypes() {
    this.cdbBenificaryMasterService.getDocumentTypes().subscribe((data) => {
      this.documentTypesArr = data as DocumentTypes[];
    })
  }
  // getDocumentForUpdate(documentTypeId: number) {
  //   this.documentTypeId = documentTypeId;
  //   this.document = new BeneficiaryDocuments();
  //   let doc = new BeneficiaryDocuments();
  //   this.cdbBenificaryMasterService.GetDocumentByBenficiary(this.beneficiaryIdForUpdate, documentTypeId).subscribe((data) => {
  //     this.document = data as BeneficiaryDocuments;
  //     this.ViewDocument = "View Document";
  //   }, (error) => {
  //     this.ViewDocument = "No File Found";
  //   })
  // }


  getDocument(documentTypeId: number) {
    if (this.selectedFile != null) {
      this.inputElement!.value = '';
    }
    this.selectedFile = null!;
    this.documentTypeId = documentTypeId;
    this.document = new BeneficiaryDocuments();
    this.cdbBenificaryMasterService.GetDocumentByBenficiary(this.beneficiaryId, documentTypeId).subscribe((data) => {
      this.document = data as BeneficiaryDocuments;
      this.ViewDocument = "View Document";
    }, (error) => {

      this.ViewDocument = "No File Found";

    })
    this.selectedFile = null!;
  }

  openDocumentInNewTab(): void {
    if (this.document && this.document.document && this.document.fileType) {
      const base64Data = this.document.document;
      const fileType = this.document.fileType;
      const blob = this.base64ToBlob(base64Data, fileType);
      const blobUrl = URL.createObjectURL(blob);

      // Open the document in a new tab
      window.open(blobUrl, '_blank');

      // Clean up
      URL.revokeObjectURL(blobUrl);
    }
  }

  private base64ToBlob(base64Data: string, contentType: string): Blob {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }


  isValidFile(file: File | undefined): boolean {
    if (!file) {
      return false;
    }
    const allowedExtensions = ['pdf', 'jpg', 'png'];
    const extension = (file.name.split('.').pop() || '').toLowerCase();
    return allowedExtensions.includes(extension);
  }

  private validateFileSize(file: File): boolean {
    const maxSize = 200 * 1024; //200KB
    return file.size <= maxSize;
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

  postDocument() {
    const formdata = new FormData();
    formdata.append('document', this.selectedFile);
    if (this.selectedFile && this.isValidFile(this.selectedFile)) {
      if (!this.validateFileSize(this.selectedFile)) {
        alert("File size under 200KB");
        return;
      }

      if (this.document.documentId == undefined) {
        this.document.documentId = 0;
      }
      this.isDocUploaded = false;
      this.cdbBenificaryMasterService.postDocument(this.beneficiaryId, this.documentTypeId, this.document.documentId, formdata).subscribe((data) => {
        this.isDocUploaded = data as boolean;
        if (this.isDocUploaded == true) {
          Swal.fire({
            icon: 'success',
            text: 'Updated Successfully',
            allowOutsideClick: false
          });
        } else {
          Swal.fire({
            icon: 'error',
            text: 'Something went wrong!',
            allowOutsideClick: false
          });
        }
        this.getDocument(this.documentTypeId);
      })
    } else {
      alert('Please select a valid PDF or JPG file.');
    }
  }


  async goToNextTab() {

    const selectedIndex = this.tabGroup?.selectedIndex;
    if (selectedIndex !== null && selectedIndex !== undefined) {

      //Codes for Applicant Details Tab
      if (selectedIndex == 0) {
        this.applicantDetailForm.markAllAsTouched();
        if (this.applicantDetailForm.invalid) {
          return;
        } else {
          this.newRegister = true;
          if (this.isDataPosted == false) {
            const year = new Date(this.cdbBenificiaryMaster.dateOfBirth).getFullYear();
            const month = (new Date(this.cdbBenificiaryMaster.dateOfBirth).getMonth() + 1).toString().padStart(2, '0');
            const day = new Date(this.cdbBenificiaryMaster.dateOfBirth).getDate().toString().padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            this.cdbBenificiaryMaster.dateOfBirth = formattedDate;
            this.cdbBenificiaryMaster.cdbBenId = "0";
            this.showSpinner = true;
            this.cdbBenificiaryMaster.aadharNo = this.encryptionService.encryptionAES(this.cdbBenificiaryMaster.aadharNo);
            try {
              this.response = await this.cdbBenificaryMasterService.postBenificiaryAddress(this.cdbBenificiaryMaster).toPromise();
              this.cdbBenificiaryMaster.aadharNo = this.encryptionService.decryptionAES(this.cdbBenificiaryMaster.aadharNo);
              this.beneficiaryId = String(JSON.parse(this.response as string));
              this.isDataPosted = true;
              this.showSpinner = false;
            } catch (error) {
              let errorMessage = 'An unknown error occurred';

              if (error instanceof HttpErrorResponse && error.status === 409 && error.error) {
                errorMessage = error.error;
              }
              Swal.fire({
                icon: 'error',
                text: errorMessage,
                allowOutsideClick: false
              });
              this.showSpinner = false;
              return;
            }

          }
        }
      }


      //Codes for Identity Details Tab
      if (selectedIndex == 1) {
        let listIdentity = new Array<IdentityTypesMaster>();
        let invalidInput = new Array<string>();
        this.identityTypesMaster = this.identityDataSource.data;
        if (this.identityTypesMaster[0].identityNumber == undefined && this.identityTypesMaster[1].identityNumber == undefined
          && this.identityTypesMaster[2].identityNumber == undefined && this.identityTypesMaster[3].identityNumber == undefined) {
          alert("Minimum One Identity Details have to provide");
          return;
        }
        this.isOneIdenetityDetailsFilled = false;
        this.identityTypesMaster.forEach((item, index) => {
          if (item.identityNumber == undefined) {
            item.identityNumber = "";
          } else {
            if (!this.containsSpecialCharacters(item.identityNumber) && (item.identityNumber != undefined || item.identityNumber != '')) {
              invalidInput.push(item.identityTypeDescription);
            } else {
              this.isOneIdenetityDetailsFilled = true;
            }

          }
          let identity = new IdentityTypesMaster();
          identity.identityNumber = item.identityNumber == "" ? "" : this.encryptionService.encryptionAES(item.identityNumber);
          identity.identityTypeCode = item.identityTypeCode;
          identity.cdbBenId = item.cdbBenId;
          identity.isDeleted = false;
          listIdentity.push(identity);
        })
        if (this.isOneIdenetityDetailsFilled == false) {
          alert("Minimum One Identity Details have to provide");
          return;
        }
        if (invalidInput.length > 0) {
          Swal.fire({
            icon: 'error',
            text: 'Invalid Input : ' + invalidInput,
            allowOutsideClick: false
          });
          return;
        }
        this.cdbBenificaryMasterService.postIdentityDetails(listIdentity).subscribe((data) => {
          this.isIdentityDetailsPosted = data as boolean;
        })
      }


      //Codes for Bank Details Tab
      if (selectedIndex == 2) {
        this.bankDetailForm.markAllAsTouched();
        if (this.bankDetailForm.invalid) {
          return;
        }
        const year = new Date(this.bankDetails.validity).getFullYear();
        const month = (new Date(this.bankDetails.validity).getMonth() + 1).toString().padStart(2, '0');
        const day = new Date(this.bankDetails.validity).getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        this.bankDetails.validity = formattedDate;
        this.bankDetails.bBankDetailCode = "0";
        this.bankDetails.cdbBenId = this.beneficiaryId;
        this.bankDetails.isDeleted = false;
        this.cdbBenificaryMasterService.postBenificiaryBankDetails(this.bankDetails).subscribe((data) => {
        })
      }


      // Codes for Land Details
      if (selectedIndex == 3) {
        this.landDetailsForm.markAllAsTouched();
        if (this.landDetailsForm.invalid) {
          return;
        }
        let listLandDetails = new Array<LandDetails>();
        this.landDetailsArr.forEach((item, index) => {
          if (item.landAreaCoconut == undefined) {
            item.landAreaCoconut = 0;
          }

          let land = new LandDetails();
          land.cdbBenId = this.beneficiaryId;
          land.totalLandAreaOwned = this.landDetails.totalLandAreaOwned;
          land.totalLandAreaCoconut = this.landDetails.totalLandAreaCoconut;
          land.totalLandAreaLoDp = this.landDetails.totalLandAreaLoDp;
          land.soilTypeCode = this.landDetails.soilTypeCode;
          land.waterSource = this.landDetails.waterSource;
          land.stateCode = this.landDetails.stateCode;
          land.districtCode = this.landDetails.districtCode;
          land.tahsilCode = this.landDetails.tahsilCode;
          land.villageCode = this.landDetails.villageCode;
          land.surveyNo = this.landDetails.surveyNo;
          land.ownershipArea = this.landDetails.ownershipArea;
          land.landOwnerTypeCode = this.landDetails.landOwnerTypeCode;
          land.coconutVarietyCode = item.coconutVarietyCode;
          land.landAreaCoconut = item.landAreaCoconut;
          land.landAreaCoconutSelect = item.landAreaCoconutSelect;
          land.avgAgePalmns = item.avgAgePalmns;
          land.avgAgePalmnsSelect = item.avgAgePalmnsSelect;
          land.yielding = item.yielding;
          land.nonYielding = item.nonYielding;
          land.totalNoPalms = item.totalNoPalms;
          land.palmsSelected = item.palmsSelected;
          land.totalAvgYieldPalmsPy = item.totalAvgYieldPalmsPy;
          land.totalAvgYieldPalmsPySelected = item.totalAvgYieldPalmsPySelected;
          land.expPy = item.expPy;
          land.incomePy = item.incomePy;

          listLandDetails.push(land);
        })

        this.cdbBenificaryMasterService.postLandDetails(listLandDetails).subscribe((data) => {

        })
      }

      //Document upload
      if (selectedIndex == 4) {

        if (this.isDocUploaded == false) {
          alert("Please Upload File");
          return;
        }
      }

      // Link to CFC
      if (selectedIndex == 5) {
        this.cfcDetailValidateForm.markAllAsTouched();
        if (this.cfcDetailValidateForm.invalid) {
          return;
        }

        this.cdbBenificaryMasterService.putLinkToCfc(this.beneficiaryId, this.cfcDetails.cfcId).subscribe((data) => {
          if (data == true) {
            Swal.fire({
              icon: 'success',
              text: 'Updated Successfully! your CFC Id : ' + this.beneficiaryId,
              allowOutsideClick: false
            });
            this.newRegister = false;
          } else {
            Swal.fire({
              icon: 'error',
              text: 'Error occures while saving the data',
              allowOutsideClick: false
            });
          }
        })
        return;
      }

      const nextIndex = selectedIndex + 1;

      if (nextIndex < this.tabGroup._tabs.length) {
        this.tabGroup.selectedIndex = nextIndex;
      }



      //Code For Identity
      if (nextIndex == 1) {
        this.getIdentitys();
      }


      //Code For Bank
      if (nextIndex == 2) {
        this.getBanks();
      }


      // Code for Land Details
      if (nextIndex == 3) {
        this.getWaterSourceTypes();
        this.getOwnershipTypes();
        this.getSoilTypes();
        this.getCoconutVerity();
      }


      // Code for Upload Doc
      if (nextIndex == 4) {
        this.getDocumentTypes();
      }

      // CFC link
      if (nextIndex == 5) {
        this.getCfcByDist(this.cdbBenificiaryMaster.districtCode);
      }

    }
  }

  goToPreviousTab() {
    const selectedIndex = this.tabGroup?.selectedIndex;
    if (selectedIndex !== null && selectedIndex !== undefined) {
      const previousIndex = selectedIndex - 1;
      if (previousIndex >= 0) {
        this.tabGroup.selectedIndex = previousIndex;
      }
    }
  }

  isOnlyNumbers(input: string): boolean {
    const numberRegex = /^[0-9]+$/;
    return numberRegex.test(input);
  }

  containsSpecialCharacters(input: string): boolean {
    // const specialCharactersRegex = /[<>!@$%^#]/;
    const specialCharactersRegex = /^[a-zA-Z0-9]+$/;
    return specialCharactersRegex.test(input);
  }
}
