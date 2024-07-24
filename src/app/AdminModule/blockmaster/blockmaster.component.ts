import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BlockMaster } from 'src/app/Model/block-master';
import { DistrictMaster } from 'src/app/Model/district-master';
import { StateMaster } from 'src/app/Model/state-master';
import { AdminservicesService } from 'src/app/Services/adminservices.service';
import { LocationService } from 'src/app/Services/location.service';


@Component({
  selector: 'app-blockmaster',
  templateUrl: './blockmaster.component.html',
  styleUrls: ['./blockmaster.component.css']
})
export class BlockmasterComponent {

  btnedit = false;
  btnupdate = true;
  districtMaster: DistrictMaster = new DistrictMaster();
  blockMaster: BlockMaster = new BlockMaster();
  stateArr: StateMaster[] = [];
  districtArr: DistrictMaster[] = [];
  blockMasterArr: BlockMaster[] = [];
  defaultState = "12";
  tempDistCode: string ="0";
  public dataSource = new MatTableDataSource<BlockMaster>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['slNo', 'blockCode', 'Block', 'Action'];

  constructor(private locationService: LocationService, private adminservice :AdminservicesService) { }

  formValidate = new FormGroup({
    blockname: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z- ]*')]),
    state: new FormControl({ value: '', disabled: true }),
    district: new FormControl('',Validators.required),
    block: new FormControl('',Validators.required),
    
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
        // this.blockMasterArr = data as BlockMaster[];
        this.dataSource.data = data as BlockMaster[];
      });
    } else {
      console.error('Selected district code is null or undefined.');
    }
  }
  
  getdistricts() {
    this.locationService.getDistrictByState(this.defaultState).subscribe(data => {
      
      this.districtArr = data as DistrictMaster[];
    })
  }

  postBlockMaster() {
    if(this.tempDistCode == "0"){
      alert("Please choose District");
      return;
    } 
    this.blockMaster.districtCode = this.tempDistCode
    this.blockMaster.blockCode = "0";
    this.blockMaster.isDeleted = false;
    console.log(this.blockMaster);
    this.adminservice.postmandalmaster(this.blockMaster).subscribe(data => {

    });
    this.getBlocks(this.districtArr);
  }

  Updatemandalmaster(item: any) {

    this.blockMaster.blockCode=item.blockMasterArr;
    this.adminservice.UpdateMandalmaster(item.blockCode, item).subscribe(data => {
      console.log(data);
    });
    item.isEditing = false;
    this.getBlocks(this.districtArr);

  }


  Editdistrictmaster(item: any) {
    item.isEditing = true;
    item.editable = !item.editable;
  }
  cancelEdit(item: any) {
    item.isEditing = false;
    item.editable = !item.editable;
    this.getBlocks(this.districtArr);

  }

  DeleteMandalmaster(item: any) {
    this.adminservice.DeleteMandalmaster(item.blockCode).subscribe(data => {
      console.log(data);
    });
    this.getBlocks(this.districtArr);

  }

  isAlphabetic(inputString: string): boolean {
    const alphabeticRegex = /^[a-zA-Z ]+$/;
    return alphabeticRegex.test(inputString);
  }
}