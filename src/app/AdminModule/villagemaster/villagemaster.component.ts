import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BlockMaster } from 'src/app/Model/block-master';
import { DistrictMaster } from 'src/app/Model/district-master';
import { PanchayatMaster } from 'src/app/Model/panchayat-master';
import { StateMaster } from 'src/app/Model/state-master';
import { VillageMaster } from 'src/app/Model/village-master';
import { AdminservicesService } from 'src/app/Services/adminservices.service';
import { LocationService } from 'src/app/Services/location.service';


@Component({
  selector: 'app-villagemaster',
  templateUrl: './villagemaster.component.html',
  styleUrls: ['./villagemaster.component.css']
})
export class VillagemasterComponent {

  
  
  btnedit = false;
  btnupdate = true;

  mandalcd:string='';

  stateArr: StateMaster[] = [];

  districtMaster: DistrictMaster = new DistrictMaster();
  blockMaster: BlockMaster = new BlockMaster();

  panchayatMaster :PanchayatMaster= new PanchayatMaster();

  villagemaster:VillageMaster= new VillageMaster();
  districtArr: DistrictMaster[] = [];
  blockMasterArr: BlockMaster[] = [];
  //panchayatMasterArr: PanchayatMaster[]=[];

  panchayatMasterArr :PanchayatMaster[]=[];
  VillageMasterArr :VillageMaster[]=[];
  defaultState = "12";
  tempDistCode: string ="0";
  tempPanchayatcd :string="0";
tahsilcode :string="0";

  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['slNo', 'Village', 'Villagename', 'Action'];

  constructor(private locationService: LocationService, private adminservices :AdminservicesService) { }

  formValidate = new FormGroup({
    blockname: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z- ]*')]),
    state: new FormControl({ value: '', disabled: true }),
    district: new FormControl('',Validators.required),
    block :new FormControl('', Validators.required),
    panchayat :new FormControl('', Validators.required),

    panchayatname: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z- ]*')]),


  })

  ngOnInit() {
    this.getState();
    this.getdistricts();


  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.formValidate.get(controlName)!.hasError(errorName);
  };

  getState() {
    this.locationService.getStates().subscribe((data) => {
      this.stateArr = data as StateMaster[];
    })
  }

  getBlocks(event: any) {
    const selectedDistrictCode = this.formValidate.get('district')?.value;
  
    if (selectedDistrictCode !== null && selectedDistrictCode !== undefined) {
      this.tempDistCode = selectedDistrictCode;
      this.locationService.getBlockByDistrict(selectedDistrictCode).subscribe(data => {
        this.blockMasterArr = data as BlockMaster[];
       // this.dataSource.data = data as PanchayatMaster[];
      });
    } else {
      console.error('Selected district code is null or undefined.');
    }
  }


  
  
  getdistricts()
  {
    alert(this.defaultState);
    this.locationService.getDistrictByState(this.defaultState).subscribe(data => {
      
      this.districtArr = data as DistrictMaster[];
    })
  }


  
  
  getpanchayatmaster(event: any) {
    const selectmandalcode = this.formValidate.get('block')?.value;
  
    if (selectmandalcode !== null && selectmandalcode !== undefined) {
      this.tempDistCode = selectmandalcode;
      this.locationService.GetPanchayatByBlock(selectmandalcode).subscribe(data => {
        this.panchayatMasterArr = data as PanchayatMaster[];
        //this.dataSource.data = data as PanchayatMaster[];
      });
    } else {
      console.error('Selected mandal  code is null or undefined.');
    }
  }


  getVillagemaster(event: any) {
    const selectpanchayatcode = this.formValidate.get('panchayat')?.value;
  
    if (selectpanchayatcode !== null && selectpanchayatcode !== undefined) {
      this.tempDistCode = selectpanchayatcode;
      this.locationService.GetVillageByPanchayat(selectpanchayatcode).subscribe(data => {
        //this.panchayatMasterArr = data as PanchayatMaster[];
        this.dataSource.data = data as VillageMaster[];
      });
    } else {
      console.error('Selected panchayat  code is null or undefined.');
    }
  }


  Postpanchayatmaster() {



    this.villagemaster.villageCode = "0";
    this.villagemaster.PanchayatCode =this.tempPanchayatcd;
    this.villagemaster.IsDeleted = false;
    this.villagemaster.TahsilCode =this.tahsilcode;


    console.log(this.panchayatMaster);
    this.adminservices.PostVillagemaster(this.villagemaster).subscribe(data => {

    });
    this.getVillagemaster(this.tempPanchayatcd);
  }

  UpdateVillagemaster(item: any) {
    this.adminservices.updatevillagemaster(item.villageCode, item).subscribe(data => {
      console.log(data);
    });
    item.isEditing = false;
    this.getVillagemaster(this.tempPanchayatcd);
  }


  Deletevillagemaster(item: any) {
    this.adminservices.Deletevillagemaster(item.villageCode).subscribe(data => {
      console.log(data);
    });
    this.getVillagemaster(this.tempPanchayatcd);
  }



  Editmandalmaster(item: any) {
    item.isEditing = true;
    item.editable = !item.editable;
  }
  cancelEdit(item: any) {
    item.isEditing = false;
    item.editable = !item.editable;
    // this.getdistricts();
  }


  isAlphabetic(inputString: string): boolean {
    const alphabeticRegex = /^[a-zA-Z ]+$/;
    return alphabeticRegex.test(inputString);
  }


}

