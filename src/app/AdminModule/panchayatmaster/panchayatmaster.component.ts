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
import { AdminservicesService } from 'src/app/Services/adminservices.service';
import { LocationService } from 'src/app/Services/location.service';



@Component({
  selector: 'app-panchayatmaster',
  templateUrl: './panchayatmaster.component.html',
  styleUrls: ['./panchayatmaster.component.css']
})
export class PanchayatmasterComponent {

  
  btnedit = false;
  btnupdate = true;

  mandalcd:string='';
  districtMaster: DistrictMaster = new DistrictMaster();
  blockMaster: BlockMaster = new BlockMaster();

  panchayatMaster :PanchayatMaster= new PanchayatMaster();
  stateArr: StateMaster[] = [];
  districtArr: DistrictMaster[] = [];
  blockMasterArr: BlockMaster[] = [];

  panchayatMasterArr :PanchayatMaster[]=[];
  defaultState = "12";
  tempDistCode: string ="0";
  tempPanchayatcd :string="0";
  public dataSource = new MatTableDataSource<PanchayatMaster>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['slNo', 'panchayat', 'panchayatname', 'Action'];

  constructor(private locationService: LocationService, private adminservices :AdminservicesService) { }

  formValidate = new FormGroup({
    blockname: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z- ]*')]),
    state: new FormControl({ value: '', disabled: true }),
    district: new FormControl('',Validators.required),
    block :new FormControl('', Validators.required),
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
        // this.blockMasterArr = data as BlockMaster[];
        this.dataSource.data = data as PanchayatMaster[];
      });
    } else {
      console.error('Selected mandal  code is null or undefined.');
    }
  }


  Postpanchayatmaster() {



    this.panchayatMaster.panchayatCode = "0";
    this.panchayatMaster.BlockCode =this.tempDistCode;
    this.panchayatMaster.isDeleted = false;
    console.log(this.panchayatMaster);
    this.adminservices.Postpanchayatmaster(this.panchayatMaster).subscribe(data => {

    });
    this.getpanchayatmaster(this.mandalcd);
  }

  Updatepanchayatmaster(item: any) {
    this.adminservices.Updatepanchayatmaster(item.panchayatCode, item).subscribe(data => {
      console.log(data);
    });
    item.isEditing = false;
    this.getpanchayatmaster(this.mandalcd);
  }


  Deletepanchayatmaster(item: any) {
    this.adminservices.Deletepanchayatmaster(item.panchayatCode).subscribe(data => {
      console.log(data);
    });
    this.getpanchayatmaster(this.mandalcd);
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
