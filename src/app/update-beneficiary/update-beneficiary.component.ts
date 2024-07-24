import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { LandDetails } from '../Model/land-details';
import { MatTabGroup, matTabsAnimations } from '@angular/material/tabs';
import { StateMaster } from '../Model/state-master';
import { DistrictMaster } from '../Model/district-master';
import { TahsilMaster } from '../Model/tahsil-master';
import { VillageMaster } from '../Model/village-master';
import { CasteMaster } from '../Model/caste-master';
import { ProfessionMaster } from '../Model/profession-master';
import { BankMaster } from '../Model/bank-master';
import { BranchMaster } from '../Model/branch-master';
import { SoilTypes } from '../Model/soil-types';
import { WaterSourceType } from '../Model/water-source-type';
import { OwnershipType } from '../Model/ownership-type';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AgreOffice } from '../Model/agre-office';
import { BankDetails } from '../Model/bank-details';
import { BeneficiaryDocuments } from '../Model/beneficiary-documents';
import { BlockMaster } from '../Model/block-master';
import { CdbBenificiaryMaster } from '../Model/cdb-benificiary-master';
import { CfcDetails } from '../Model/cfc-details';
import { CfcMaster } from '../Model/cfc-master';
import { DocumentTypes } from '../Model/document-types';
import { IdentityTypesMaster } from '../Model/identity-types-master';
import { PanchayatMaster } from '../Model/panchayat-master';
import { CdbBenificaryMasterService } from '../Services/cdb-benificary-master.service';
import { CfcDetailsService } from '../Services/cfc-details.service';
import { LocationService } from '../Services/location.service';
import { EncryptionService } from '../Services/encryption-service.service';

@Component({
  selector: 'app-update-beneficiary',
  templateUrl: './update-beneficiary.component.html',
  styleUrls: ['./update-beneficiary.component.css']
})

export class UpdateBeneficiaryComponent {
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
  private inputElement: HTMLInputElement | undefined;
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
  // beneficiaryId: string = "";
  beneficiaryIdForUpdate: string = "";
  doesNotExists: string = "";
  documentTypeId: number = 0;
  isCfcExists: string = "";
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
  cfcDetailsArr: CfcDetails[] = [];
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

  cfcDetails: CfcDetails = new CfcDetails();
  professionMaster: ProfessionMaster = new ProfessionMaster();
  casteMaster: CasteMaster = new CasteMaster();
  bankDetails: BankDetails = new BankDetails();
  cdbBenificiaryMaster: CdbBenificiaryMaster = new CdbBenificiaryMaster();
  landDetails: LandDetails = new LandDetails();
  documentTypes: DocumentTypes = new DocumentTypes();
  beneficiaryDocuments: BeneficiaryDocuments = new BeneficiaryDocuments();

  applicantDetailForm: FormGroup;
  bankDetailForm: FormGroup;
  landDetailsForm: FormGroup;
  cfcDetailValidateForm: FormGroup;
  formSubscription: Subscription;

  maxDate: any;

  isDataPosted: boolean = false;
  response: any;
  @ViewChild('iframe') iframe: ElementRef | undefined;
  document: BeneficiaryDocuments = new BeneficiaryDocuments();
  constructor(private router: Router, private locationService: LocationService, private cdbBenificaryMasterService: CdbBenificaryMasterService,
    private formBuilder: FormBuilder, private cfcDetailsService: CfcDetailsService, private encryptionServices: EncryptionService, private cdr: ChangeDetectorRef) {
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

    // CFC link formcontroller
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
    if(this.encryptionServices.checkLogin() == false){
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

  getAllBank() {
    this.cdbBenificaryMasterService.getAllBanks().subscribe((data) => {
      this.bankmasterArr = data as BankMaster[];
    })
  }
  getAllBranch() {
    this.cdbBenificaryMasterService.getAllBranch().subscribe((data) => {
      this.branchMasterArr = data as BranchMaster[];
      this.IFSC = this.branchMasterArr.find(e => e.branchCode === this.bankDetails.branchCode)?.ifscCode;
    })
  }

  async getIfsc(branch: string) {
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
  getDocumentForUpdate(documentTypeId: number) {
    if (this.selectedFile != null) {
      this.inputElement!.value = '';
    }

    this.documentTypeId = documentTypeId;
    this.document = new BeneficiaryDocuments();
    this.selectedFile = null!;
    this.cdbBenificaryMasterService.GetDocumentByBenficiary(this.beneficiaryIdForUpdate, documentTypeId).subscribe((data) => {
      this.document = data as BeneficiaryDocuments;

      this.ViewDocument = "View Document";
    }, (error) => {
      this.ViewDocument = "No File Found";
    })
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

  putDocument() {
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
      this.cdbBenificaryMasterService.postDocument(this.beneficiaryIdForUpdate, this.documentTypeId, this.document.documentId, formdata).subscribe((data) => {
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
        this.inputElement!.value = '';
        this.getDocumentForUpdate(this.documentTypeId);

      })
    } else {
      alert('Please select a valid PDF or JPG file.');
    }
  }

  //cfc
  getCfcByDist() {
    this.cfcDetailsService.getCfcByDistrict(this.cdbBenificiaryMaster.districtCode).subscribe((data) => {
      this.cfcDetailsArr = data as CfcDetails[];
    })
  }

  //Update Beneficiary Details
  getDetails() {
    if (this.beneficiaryIdForUpdate == "") {
      alert("Please enter Beneficiary ID");
      return;
    }

    if (!this.isOnlyNumbers(this.beneficiaryIdForUpdate)) {
      alert("Only Numbers are allowed");
      return;
    }
    if (this.beneficiaryIdForUpdate.length > 15) {
      alert("Beneficiary Id not morethan 15 digit");
      return;
    }
    this.selectedFile = null!;
    this.showUpdateForm = false;
    this.doesNotExists = "";

    this.cdbBenificaryMasterService.getBeneficiaryDetailsById(this.beneficiaryIdForUpdate).subscribe((data) => {
      this.cdbBenificiaryMaster = data as CdbBenificiaryMaster;
      this.cdbBenificiaryMaster.aadharNo = this.encryptionServices.decryptionAES(this.cdbBenificiaryMaster.aadharNo);
      this.cdr.detectChanges();
      this.showUpdateForm = true;
      this.getAllBank();
      this.getAllBranch();
      this.getDocumentTypes();
      this.getWaterSourceTypes();
      this.getOwnershipTypes();
      this.getSoilTypes();
      this.getCfcmaster();
      this.getCfcByDist();
      this.cfcDetails.cfcId = this.cdbBenificiaryMaster.cfcId;
      this.document = new BeneficiaryDocuments();
      this.ViewDocument = "";
    }, (error) => {
      this.doesNotExists = "CFC ID Doesnot Exists!";
    });

    this.cdbBenificaryMasterService.getBankByState(this.cdbBenificiaryMaster.stateCode).subscribe((data) => {
      this.bankmasterArr = data as BankMaster[];

    })

    this.cdbBenificaryMasterService.identityDetailsByBenId(this.beneficiaryIdForUpdate).subscribe((data) => {
      this.identityDataSource = new MatTableDataSource<IdentityTypesMaster>(
        data.map((item) => {
          item.identityNumber = this.encryptionServices.decryptionAES(item.identityNumber);
          return item;
        }));
    })

    this.cdbBenificaryMasterService.getBeneficiaryBankDetails(this.beneficiaryIdForUpdate).subscribe((data) => {
      this.bankDetails = data as BankDetails;
    })

    this.cdbBenificaryMasterService.getBeneficiaryLandDetails(this.beneficiaryIdForUpdate).subscribe((data) => {
      this.landDetailsArr = data as LandDetails[];
      this.landDetails = this.landDetailsArr[0];
    })
  }

  updateBeneficiaryDetails() {
    this.applicantDetailForm.markAllAsTouched();
    if (this.applicantDetailForm.invalid) {
      return;
    }
    this.cdbBenificiaryMaster.aadharNo = this.encryptionServices.encryptionAES(this.cdbBenificiaryMaster.aadharNo);
    this.cdbBenificaryMasterService.putBenificiaryAddress(this.cdbBenificiaryMaster.cdbBenId, this.cdbBenificiaryMaster).subscribe((data: boolean) => {
      this.cdbBenificiaryMaster.aadharNo = this.encryptionServices.decryptionAES(this.cdbBenificiaryMaster.aadharNo);
      if (data == true) {
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
    }, (error) => {
      Swal.fire({
        icon: 'error',
        text: error.error,
        allowOutsideClick: false
      });
    }
    )
  }

  updateIdentityDetails() {

    let listIdentity = new Array<IdentityTypesMaster>();
    let invalidInput = new Array<string>();
    this.identityTypesMaster = this.identityDataSource.data;
    console.log(this.identityTypesMaster[0].identityNumber,"id");
    if(this.identityTypesMaster[0].identityNumber == '' && this.identityTypesMaster[1].identityNumber == ''
    && this.identityTypesMaster[2].identityNumber == '' && this.identityTypesMaster[3].identityNumber == '')
    {
      alert("Minimum One Identity Details have to provide");
      return;
    }

    this.isOneIdenetityDetailsFilled = false;
    this.identityTypesMaster.forEach((item, index) => {
      if (item.identityNumber == undefined) {
        item.identityNumber = "";
      } else {
        if (!this.containsSpecialCharacters(item.identityNumber) && item.identityNumber != "") {
          invalidInput.push(item.identityTypeDescription);
        }else{
          this.isOneIdenetityDetailsFilled = true;
        }
      }
      let identity = new IdentityTypesMaster();
      identity.identityNumber = item.identityNumber == "" ? "" : this.encryptionServices.encryptionAES(item.identityNumber);
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
      if (this.isIdentityDetailsPosted == true) {
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
    })
  }

  updateBankDetails() {
    this.bankDetailForm.markAllAsTouched();
    if (this.bankDetailForm.invalid) {
      return;
    }
    const year = new Date(this.bankDetails.validity).getFullYear();
    const month = (new Date(this.bankDetails.validity).getMonth() + 1).toString().padStart(2, '0');
    const day = new Date(this.bankDetails.validity).getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    this.bankDetails.validity = formattedDate;
    // this.bankDetails.bBankDetailCode = "0";
    // this.bankDetails.cdbBenId = this.beneficiaryId;
    // this.bankDetails.isDeleted = false;
    this.cdbBenificaryMasterService.postBenificiaryBankDetails(this.bankDetails).subscribe((data) => {
      if (data == true) {
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
    })
  }

  UpdateLandDetails() {
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
      land.cdbBenId = item.cdbBenId;
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
      if (data == true) {
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
    })
  }

  UpdateCfcLink() {
    this.cfcDetailValidateForm.markAllAsTouched();
    if (this.cfcDetailValidateForm.invalid) {
      return;
    }
    this.cdbBenificaryMasterService.putLinkToCfc(this.beneficiaryIdForUpdate, this.cfcDetails.cfcId).subscribe((data) => {
      if (data == true) {
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
    })
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
