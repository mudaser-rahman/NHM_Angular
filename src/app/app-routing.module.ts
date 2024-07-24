import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CDBAEOneYearComponent } from './cdb-ae-one-year/cdb-ae-one-year.component';
import { CDBAETwoYearComponent } from './cdb-ae-two-year/cdb-ae-two-year.component';
import { SubsidyOneYearComponent } from './subsidy-one-year/subsidy-one-year.component';
import { SubsidyTwoYearComponent } from './subsidy-two-year/subsidy-two-year.component';
import { CDBLoComponent } from './cdb-lo/cdb-lo.component';
import { BasicDetailsComponent } from './basic-details/basic-details.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { CfcPresidentDetailsComponent } from './cfc-president-details/cfc-president-details.component';
import { CFCSecretratyDetailsComponent } from './cfcsecretraty-details/cfcsecretraty-details.component';
import { CFCMemberDetailsComponent } from './cfcmember-details/cfcmember-details.component';
import { CFCDetailsComponent } from './cfcdetails/cfcdetails.component';
import { CFCReportComponent } from './cfcreport/cfcreport.component';
import { EmptyComponent } from './empty/empty.component';
import { CfcMasterComponent } from './cfc-master/cfc-master.component';
import { CdbHomeComponent } from './cdb-home/cdb-home.component';
import { CdbLoginComponent } from './cdb-login/cdb-login.component';
import { AppComponent } from './app.component';
import { AdminlayoutComponent } from './adminlayout/adminlayout.component';
import { DistrictmasterComponent } from './AdminModule/districtmaster/districtmaster.component';
import { BlockmasterComponent } from './AdminModule/blockmaster/blockmaster.component';
import { PanchayatmasterComponent } from './AdminModule/panchayatmaster/panchayatmaster.component';
import { VillagemasterComponent } from './AdminModule/villagemaster/villagemaster.component';
import { PincodemasterComponent } from './AdminModule/pincodemaster/pincodemaster.component';
import { BankmasterComponent } from './AdminModule/bankmaster/bankmaster.component';
import { AddnewbankComponent } from './AdminModule/addnewbank/addnewbank.component';
import { BranchmasterComponent } from './AdminModule/branchmaster/branchmaster.component';
import { BeneficearydetailsComponent } from './AdminModule/beneficearydetails/beneficearydetails.component';
import { StatewisebeneficearydetailsComponent } from './AdminModule/statewisebeneficearydetails/statewisebeneficearydetails.component';
import { ComponentselectionmasterComponent } from './AdminModule/componentselectionmaster/componentselectionmaster.component';
import { CoEDetailsEntryComponent } from './AdminModule/co-edetails-entry/co-edetails-entry.component';
import { CoEDetailsComponent } from './AdminModule/co-edetails/co-edetails.component';
import { ODOFPComponentselectionComponent } from './AdminModule/odofpcomponentselection/odofpcomponentselection.component';
import { ODOFPAchievmentComponent } from './AdminModule/odofp-achievment/odofp-achievment.component';
import { HQDataPhysicaltargetsComponent } from './AdminModule/hq-data-physicaltargets/hq-data-physicaltargets.component';
import { DistrictDatatargetsComponent } from './AdminModule/district-datatargets/district-datatargets.component';
import { SucessStoryComponent } from './AdminModule/sucess-story/sucess-story.component';
import { ProjectDetailsComponent } from './AdminModule/project-details/project-details.component';
import { ProjectEntryComponent } from './AdminModule/project-entry/project-entry.component';
import { StateleveldataComponent } from './AdminModule/stateleveldata/stateleveldata.component';
import { DistictStatusReportComponent } from './AdminMomdule/distict-status-report/distict-status-report.component';
import { DistrictleveldataEntryComponent } from './AdminModule/districtleveldata-entry/districtleveldata-entry.component';




const routes: Routes = [

  // {path:'home',component:CdbHomeComponent},
  // // { path: '**', redirectTo: '/basic-details' },
  //  { path: '', redirectTo: '/basic-details', pathMatch: 'full' },

  // { path: 'subsidy-one-year', component: SubsidyOneYearComponent },
  // { path: 'subsidy-two-year', component: SubsidyTwoYearComponent },
  // { path: 'cdbae-one-year', component: CDBAEOneYearComponent},
  // { path: 'cedae-two-year', component: CDBAETwoYearComponent},
  // { path: 'cbd-lo', component: CDBLoComponent},
  // {path:'basic-details',component:BasicDetailsComponent},
  // {path:'bank-details',component:BankDetailsComponent},
  // {path:'cfc-president-details',component:CfcPresidentDetailsComponent},
  // {path:'cfc-secretraty-details',component:CFCSecretratyDetailsComponent},
  // {path:'cfc-members-details',component:CFCMemberDetailsComponent},
  // {path:'cfc-details',component:CFCDetailsComponent},
  // {path:'cfc-report',component:CFCReportComponent},
  // {path:'empty',component:EmptyComponent},
  
  // {path:'cfc-master',component:CfcMasterComponent},


  //azhar
  {path: 'home_page', component: CdbHomeComponent},
{path: 'login', component: CdbLoginComponent},
  
{

  path: '', component: CdbHomeComponent,
  children: [
     { path: '', redirectTo: '/login', pathMatch: 'full' },
    
    { path: 'subsidy-one-year', component: SubsidyOneYearComponent },
    { path: 'subsidy-two-year', component: SubsidyTwoYearComponent },
    { path: 'cdbae-one-year', component: CDBAEOneYearComponent},
    { path: 'cedae-two-year', component: CDBAETwoYearComponent},
    { path: 'cbd-lo', component: CDBLoComponent},
    {path:'basic-details',component:BasicDetailsComponent},
    {path:'bank-details',component:BankDetailsComponent},
    {path:'cfc-president-details',component:CfcPresidentDetailsComponent},
    {path:'cfc-secretraty-details',component:CFCSecretratyDetailsComponent},
    {path:'cfc-members-details',component:CFCMemberDetailsComponent},
    {path:'cfc-details',component:CFCDetailsComponent},
    {path:'cfc-report',component:CFCReportComponent},
    {path:'empty',component:EmptyComponent},
    
    {path:'cfc-master',component:CfcMasterComponent},
  ]
},


{

  path: 'adminlayout', component: AdminlayoutComponent,
  children: [
   
    // {path: 'home_page', component: CdbHomeComponent},
    { path: 'districtmaster', component: DistrictmasterComponent },
    { path: 'blockmaster', component: BlockmasterComponent },
    { path: 'panchayatmaster', component: PanchayatmasterComponent},
    { path: 'villagemaster', component: VillagemasterComponent},
    { path: 'pincodemaster', component: PincodemasterComponent},
    {path:'bankmaster',component:BankmasterComponent},
    {path:'branchmaster',component:BranchmasterComponent},
    {path:'addnew-bank',component:AddnewbankComponent},
    {path:'cfc-secretraty-details',component:CFCSecretratyDetailsComponent},
    {path:'cfc-members-details',component:CFCMemberDetailsComponent},
    {path:'cfc-details',component:CFCDetailsComponent},
    {path:'cfc-report',component:CFCReportComponent},
    {path:'empty',component:EmptyComponent},
    
    {path:'cfc-master',component:CfcMasterComponent},

    {path:'statewisebeneficeary', component:StatewisebeneficearydetailsComponent},

    {path:'Beneficearydetails', component:BeneficearydetailsComponent},

    {path:'componentselection', component:ComponentselectionmasterComponent},

    {path:'CoeDetailsentry', component:CoEDetailsEntryComponent},

    {path:'CoEDetails', component:CoEDetailsComponent},

    
    {path:'ODFOP_Componentselection', component:ODOFPComponentselectionComponent},

    
    {path:'ODOFP_Achievment', component:ODOFPAchievmentComponent},

    
    {path:'CoEDetails', component:CoEDetailsComponent},

    {path:'state_Data', component:HQDataPhysicaltargetsComponent},


    {path:'District_Data', component:DistrictDatatargetsComponent},

    {path:'sucess_story', component:SucessStoryComponent},

    {path:'Dashboard_state', component:ProjectDetailsComponent},

    {path:'Project_Entry', component:ProjectEntryComponent},

    {path:'StatesData_Entry_Status', component:StateleveldataComponent},

    {path:'district_data_entrystatus', component:DistrictleveldataEntryComponent}

    


  ]
},
 ];





@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
