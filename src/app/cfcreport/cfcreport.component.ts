import { Component } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { LocationService } from '../Services/location.service';
import { CfcDetailsService } from '../Services/cfc-details.service';
import { CfcReport } from '../Model/cfc-report';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { EncryptionService } from '../Services/encryption-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cfcreport',
  templateUrl: './cfcreport.component.html',
  styleUrls: ['./cfcreport.component.css']
})
export class CFCReportComponent {

  cfcReport : CfcReport = new CfcReport();
  public dataSource = new MatTableDataSource<CfcReport>();
  constructor(private cfcDetailsService: CfcDetailsService,private encryptServices:EncryptionService,private router: Router,) { }
  displayedColumns: string[] = ['slNo', 'id', 'name', 'president', 'Secretraty', 'Member'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if(this.encryptServices.checkLogin() == false){
      this.router.navigate(['login']);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
    this.cfcReports();
  }

  cfcReports(){
    this.cfcDetailsService.getCfcReport().subscribe((data)=>{
      this.dataSource.data = data as CfcReport[];
    })
  }

}
