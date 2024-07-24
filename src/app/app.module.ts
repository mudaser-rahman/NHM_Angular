import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from "@angular/router"; 

import { AppComponent } from './app.component';
import { SubsidyOneYearComponent } from './subsidy-one-year/subsidy-one-year.component';
import { CDBLoComponent } from './cdb-lo/cdb-lo.component';
import { FormsModule } from '@angular/forms';
import { SubsidyTwoYearComponent } from './subsidy-two-year/subsidy-two-year.component';
import { CDBAEOneYearComponent } from './cdb-ae-one-year/cdb-ae-one-year.component';
import { CDBAETwoYearComponent } from './cdb-ae-two-year/cdb-ae-two-year.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon'
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatExpansionModule} from '@angular/material/expansion';
import { BasicDetailsComponent } from './basic-details/basic-details.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { MatInputModule } from '@angular/material/input'; 
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CfcPresidentDetailsComponent } from './cfc-president-details/cfc-president-details.component';
import {ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { CFCSecretratyDetailsComponent } from './cfcsecretraty-details/cfcsecretraty-details.component';
import { CFCMemberDetailsComponent } from './cfcmember-details/cfcmember-details.component';
import { CFCDetailsComponent } from './cfcdetails/cfcdetails.component';
import { CFCReportComponent } from './cfcreport/cfcreport.component';
import {MatTableModule} from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';





import { EmptyComponent } from './empty/empty.component';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { CfcMasterComponent } from './cfc-master/cfc-master.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { UpdateBeneficiaryComponent } from './update-beneficiary/update-beneficiary.component';
import { CdbLoginComponent } from './cdb-login/cdb-login.component';
import { CdbHomeComponent } from './cdb-home/cdb-home.component';
import { AdminlayoutComponent } from './adminlayout/adminlayout.component';
import { DistrictmasterComponent } from './AdminModule/districtmaster/districtmaster.component';
import { BlockmasterComponent } from './AdminModule/blockmaster/blockmaster.component';
import { PanchayatmasterComponent } from './AdminModule/panchayatmaster/panchayatmaster.component';
import { VillagemasterComponent } from './AdminModule/villagemaster/villagemaster.component';
import { PincodemasterComponent } from './AdminModule/pincodemaster/pincodemaster.component';
import { BankmasterComponent } from './AdminModule/bankmaster/bankmaster.component';
import { BramchmasterComponent } from './AdminModule/bramchmaster/bramchmaster.component';
import { BranchmasterComponent } from './AdminModule/branchmaster/branchmaster.component';
import { AddnewbankComponent } from './AdminModule/addnewbank/addnewbank.component';
import { BeneficearydetailsComponent } from './AdminModule/beneficearydetails/beneficearydetails.component';
import { StatewisebeneficearydetailsComponent } from './AdminModule/statewisebeneficearydetails/statewisebeneficearydetails.component';
import { CoEDetailsEntryComponent } from './AdminModule/co-edetails-entry/co-edetails-entry.component';
import { CoEDetailsComponent } from './AdminModule/co-edetails/co-edetails.component';
import { ODOFPComponentselectionComponent } from './AdminModule/odofpcomponentselection/odofpcomponentselection.component';
import { ODOFPAchievmentComponent } from './AdminModule/odofp-achievment/odofp-achievment.component';
import { HQDataPhysicaltargetsComponent } from './AdminModule/hq-data-physicaltargets/hq-data-physicaltargets.component';
import { DistrictDatatargetsComponent } from './AdminModule/district-datatargets/district-datatargets.component';

import { ProjectDetailsComponent } from './AdminModule/project-details/project-details.component';
import { ProjectEntryComponent } from './AdminModule/project-entry/project-entry.component';
import { DistictStatusReportComponent } from './AdminMomdule/distict-status-report/distict-status-report.component';
import { StateleveldataComponent } from './AdminModule/stateleveldata/stateleveldata.component';
import { DistrictleveldataEntryComponent } from './AdminModule/districtleveldata-entry/districtleveldata-entry.component';
import { MatRadioButton } from '@angular/material/radio';
import { SucessStoryComponent } from './AdminModule/sucess-story/sucess-story.component';
import { ComponentselectionmasterComponent } from './AdminModule/componentselectionmaster/componentselectionmaster.component';



@NgModule({
  declarations: [
    AppComponent,
    SubsidyOneYearComponent,
    CDBLoComponent,
    SubsidyTwoYearComponent,
    CDBAEOneYearComponent,
    CDBAETwoYearComponent,
    BasicDetailsComponent,
    BankDetailsComponent,
    CfcPresidentDetailsComponent,
    CFCSecretratyDetailsComponent,
    CFCMemberDetailsComponent,
    CFCDetailsComponent,
    CFCReportComponent,
    EmptyComponent,
    CfcMasterComponent,
    UpdateBeneficiaryComponent,
    CdbLoginComponent,
    CdbHomeComponent,
    AdminlayoutComponent,
    DistrictmasterComponent,
    BlockmasterComponent,
    PanchayatmasterComponent,
    VillagemasterComponent,
    PincodemasterComponent,
    BankmasterComponent,
    BramchmasterComponent,
    BranchmasterComponent,
    AddnewbankComponent,
    BeneficearydetailsComponent,
    StatewisebeneficearydetailsComponent,
    ComponentselectionmasterComponent,
    CoEDetailsEntryComponent,
    CoEDetailsComponent,
    ODOFPComponentselectionComponent,
    ODOFPAchievmentComponent,
    HQDataPhysicaltargetsComponent,
    DistrictDatatargetsComponent,
    SucessStoryComponent,
    ProjectDetailsComponent,
    ProjectEntryComponent,
    DistictStatusReportComponent,
    StateleveldataComponent,
    DistrictleveldataEntryComponent


  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,

    

    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSidenavModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatTabsModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
     MatTooltipModule,
     MatSortModule,
     MatTableModule,
    //  MatPaginator,
     MatPaginatorModule,
    //  MatSort,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    RouterModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
