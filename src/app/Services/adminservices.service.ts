import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddDistrictmaster } from '../Model/adddistrictmaster';
import { MandalMasterang } from '../Model/MandalMasterang';
import { VillageMaster } from '../Model/village-master';
import { PanchayatMaster } from '../Model/panchayat-master';
import { BlockMaster } from '../Model/block-master';
import { Beneficearydetails } from '../Model/Beneficearydetails';
import { BeneficearyData } from '../Model/BeneficearyData';
import { ComponentSelectionmaster } from '../Model/Componentseelction';
import { CoEDetailsmaster } from '../Model/CoEdetailsmaster';
import { ComponentAchievment } from '../Model/ComponentAchievment';
import { Sucessstories } from '../Model/Sucessstories';
import { Projectdetails } from '../Model/Projectdetails';
import { Observable } from 'rxjs';
import { LoginUser } from '../Model/login-user';


// export interface TreeNode {
//   component_Name: string;
//   children?: TreeNode[];
// }

@Injectable({
  providedIn: 'root'
})

export class AdminservicesService {
  constructor(private httpClient: HttpClient) {}

  private Rest_API_SERVER1 = 'https://localhost:7026/api/CoEDeatils';

  private Rest_API_SERVER = 'https://localhost:7026/api/Beneficeary';

  private Rest_API_SERVER2= 'https://localhost:7026/api/Login';


  //https://localhost:7026/api/Beneficeary/GetStatemasters

  public GetStatemaster() {
    return this.httpClient.get(this.Rest_API_SERVER + '/GetStatemasters');
  }

  getdistrictmasterdata(statecd: string, kon: string) {
    return this.httpClient.get(
      this.Rest_API_SERVER1 + '/getdistrict?statecd=' + statecd + '&kon=' + kon
    );
  }

  public Getdistrictmaster(statecd: string) {
    //https://localhost:7026/api/Beneficeary/GetLgDistrictmaster?statecd=12
    return this.httpClient.get(
      this.Rest_API_SERVER + '/GetDistrict?statecd=' + statecd
    );
  }

  public Getlgdistrictmaster(statecd: string) {
    //https://localhost:7026/api/Beneficeary/GetLgDistrictmaster?statecd=12
    return this.httpClient.get(
      this.Rest_API_SERVER + '/GetLgDistrictmaster?statecd=' + statecd
    );
  }

  public getyearmaster() {
    //https://localhost:7026/api/Beneficeary/GetYearmaster

    return this.httpClient.get(this.Rest_API_SERVER + '/GetYearmaster');
  }

  public getmonths() {
    //https://localhost:7026/api/CoEDeatils/GetMonths

    return this.httpClient.get(this.Rest_API_SERVER1 + '/GetMonths');
  }

  public GetCoeDetailsentry(statecd: string, monthcd: string, yearcd: string) {
    //https://localhost:7026/api/CoEDeatils/GetCoEDetails?stdcode=21&months=4&years=2021-22

    return this.httpClient.get(
      this.Rest_API_SERVER1 +
        '/GetCoEDetails?stdcode=' +
        statecd +
        '&months=' +
        monthcd +
        '&years=' +
        yearcd
    );
  }

  public UpdatecoEdetails(addcoedetails: CoEDetailsmaster) {
    //https://localhost:7026/api/CoEDeatils/UpdateCoeDetailsmaster

    return this.httpClient.put(
      this.Rest_API_SERVER1 + '/UpdateCoeDetailsmaster',
      addcoedetails
    );
  }

  public DeleteCoeDetailsmaster(coeid: string) {
    //https://localhost:7026/api/CoEDeatils/DeleteCoeDetailsmaster?eid=2

    return this.httpClient.delete(
      this.Rest_API_SERVER1 + '/DeleteCoeDetailsmaster?eid=' + coeid
    );
  }

  public PostCoEDetails(addcoedetailsmaster: CoEDetailsmaster) {
    return this.httpClient.post(
      this.Rest_API_SERVER1 + '/PostCoEDetails',
      addcoedetailsmaster
    );
  }

  public GetCategorymaster() {
    //https://localhost:7026/api/Beneficeary/GetCategorymaster
    return this.httpClient.get(this.Rest_API_SERVER + '/GetCategorymaster');
  }

  public GetSubcategorymaster(categoryid: string) {
    //https://localhost:7026/api/Beneficeary/Getsubcategorymaster?categoryid=1

    return this.httpClient.get(
      this.Rest_API_SERVER + '/Getsubcategorymaster?categoryid=' + categoryid
    );
  }

  public GetSubcategorymaster2(subcategoryid: string) {
    //https://localhost:7026/api/Beneficeary/GetSubcategory?subcategoryid=101
    return this.httpClient.get(
      this.Rest_API_SERVER + '/GetSubcategory?subcategoryid=' + subcategoryid
    );
  }

  public GetSubcategorymaster3(subcategory2id: string) {
    //https://localhost:7026/api/Beneficeary/GetSubcategory3master?subcategory2id=1011

    return this.httpClient.get(
      this.Rest_API_SERVER +
        '/GetSubcategory3master?subcategory2id=' +
        subcategory2id
    );
  }

  public GetCopmponentmaster(subcategory3id: string) {
    return this.httpClient.get(
      this.Rest_API_SERVER + '/getcompoonent?subcategory3=' + subcategory3id
    );
  }

  public GetAllBeneficearydata(statecd: string, yearcd: string) {
    //https://localhost:7026/api/Beneficeary/GetAllData?statecd=01&yearcd=12

    return this.httpClient.get(
      this.Rest_API_SERVER +
        '/GetAllData?statecd=' +
        statecd +
        '&yearcd=' +
        yearcd
    );
  }

  public GetBeneficearyData(statecd: string, yearcd: string) {
    //https://localhost:7026/api/Beneficeary/GetBeneficearyDetails?statecd=21&yearcd=2017-18

    return this.httpClient.get(
      this.Rest_API_SERVER +
        '/GetBeneficearyDetails?statecd=' +
        statecd +
        '&yearcd=' +
        yearcd
    );
  }

  public Getallsates() {
    //https://localhost:7108/api/Admin/getAllstates

    return this.httpClient.get(this.Rest_API_SERVER + '/getAllstates');
  }

  public Getdistrictmaster11(statecd: string) {
    return this.httpClient.get(
      this.Rest_API_SERVER + '/getDistrictByState?statecode=' + statecd
    );
  }

  public Poststatewisebeneficerydetails(
    addbeneficearydetails: Beneficearydetails
  ) {
    //https://localhost:7026/api/Beneficeary/PoststateBeneficeary

    return this.httpClient.post(
      this.Rest_API_SERVER + '/PoststateBeneficeary',
      addbeneficearydetails
    );
  }

  public PostBeneficearyData(addbeneficearydata: BeneficearyData) {
    //https://localhost:7026/api/Beneficeary/PostBeneficearydetails

    return this.httpClient.post(
      this.Rest_API_SERVER + '/PostBeneficearydetails',
      addbeneficearydata
    );
  }

  GetSelectComponenetmaster(
    statecd: string,
    yearcd: string,
    ddlChoice: string
  ) {
    //https://localhost:7026/api/Beneficeary/GetComponetselectionmaster?statecd=21&yearcd=2021-22&ddlChoice=SpillOverActivity

    return this.httpClient.get(
      this.Rest_API_SERVER +
        '/GetComponetselectionmaster?statecd=' +
        statecd +
        '&yearcd=' +
        yearcd +
        '&ddlChoice=' +
        ddlChoice
    );
  }

  public PostSelectioncompoenenetmaster(
    choicecd: string,
    addcomponentselection: ComponentSelectionmaster
  ) {
    //https://localhost:7026/api/Beneficeary/PostComponentselectionmaster?ddlChoice=SpillOverActivity

    return this.httpClient.post(
      this.Rest_API_SERVER +
        '/PostComponentselectionmaster?ddlChoice=' +
        choicecd,
      addcomponentselection
    );
  }

  public Postdistrictmasters(adddistrictmaster: AddDistrictmaster) {
    //https://localhost:7026/api/Beneficeary/PoststateBeneficeary

    return this.httpClient.post(
      this.Rest_API_SERVER + '/postDistrictMaster',
      adddistrictmaster
    );
  }

  public updatedistrictmaster(
    id: string,
    adddistrictmaster: AddDistrictmaster
  ) {
    //https://localhost:7108/api/Admin/UpdateDistrictmaster?id=558

    return this.httpClient.put(
      this.Rest_API_SERVER + '/UpdateDistrictmaster?id=' + id,
      adddistrictmaster
    );
  }

  public deletedistrctmaster(id: string) {
    return this.httpClient.delete(
      this.Rest_API_SERVER + '/Deletedistrictmaster?id=' + id
    );
  }

  public getBlockByDistrict(distcd: string) {
    return this.httpClient.get(
      this.Rest_API_SERVER + '/getBlocksBydistrict?districtCode=' + distcd
    );
  }

  public getmandlmaster(statecd: string, distcd: string) {
    return this.httpClient.get(
      this.Rest_API_SERVER +
        '/GetBlockmaster?statecd=' +
        statecd +
        '&distcd=' +
        distcd
    );
  }

  public GetVillage(statecd: string, distcd: string, mandalcd: string) {
    //https://localhost:7026/api/Beneficeary/GetVillagemaster?statecd=12&distcd=02&mandalcd=02

    return this.httpClient.get(
      this.Rest_API_SERVER +
        '/GetVillagemaster?statecd=' +
        statecd +
        '&distcd=' +
        distcd +
        '&mandalcd=' +
        mandalcd
    );
  }

  public getpanchayatmaster(
    statecd: string,
    distcd: string,
    mandalcd: string,
    kon: string
  ) {
    //https://localhost:7026/api/Beneficeary/GetVillagemaster?statecd=12&distcd=02&mandalcd=02

    return this.httpClient.get(
      this.Rest_API_SERVER +
        '/Getpanchayat?statecd=' +
        statecd +
        '&distcd=' +
        distcd +
        '&mandalcd=' +
        mandalcd +
        '&kon=' +
        kon
    );
  }

  public postmandalmaster(addmandalmaster: BlockMaster) {
    //https://localhost:7108/api/Admin/Postblockmaster

    return this.httpClient.post(this.Rest_API_SERVER + '/Postblockmaster', addmandalmaster);
  }

  public UpdateMandalmaster(
    mandalcd: string,
    addmandalmaster: MandalMasterang
  ) {
    //https://localhost:7108/api/Admin/UpdateBlockmaster?id=155

    return this.httpClient.put(this.Rest_API_SERVER + '/UpdateBlockmaster?id=' + mandalcd, addmandalmaster);
  }

  public DeleteMandalmaster(mandalcd: string) {
    //https://localhost:7108/api/Admin/DeleteBlockmaster?id=155

    return this.httpClient.delete( this.Rest_API_SERVER + '/DeleteBlockmaster?id=' + mandalcd);
  }

  public getvillagemaster(
    statecd: string,
    distcd: string,
    mandalcd: string,
    panchayatcd: string,
    kon: string
  ) {
    return this.httpClient.get(this.Rest_API_SERVER +'/GetVillages?statecd=' +statecd +'&kon=' +kon +'&distcd=' + distcd +'&mandalcd=' +mandalcd +'&panchayatcd=' + panchayatcd);
  }

  public Postpanchayatmaster(addpanchayat: PanchayatMaster) {
    //https://localhost:7108/api/Admin/Postpanchayatmaster

    return this.httpClient.post(
      this.Rest_API_SERVER + '/Postpanchayatmaster',
      addpanchayat
    );
  }

  public Updatepanchayatmaster(
    panchayatcd: string,
    addpanchayat: PanchayatMaster
  ) {
    //https://localhost:7108/api/Admin/Updatepanchayatmaster?id=095

    return this.httpClient.put(
      this.Rest_API_SERVER + '/Updatepanchayatmaster?id=' + panchayatcd,
      addpanchayat
    );
  }

  public Deletepanchayatmaster(panchayatcd: string) {
    //https://localhost:7108/api/Admin/Deletepanchayatmaster?id=095

    return this.httpClient.delete(
      this.Rest_API_SERVER + '/Deletepanchayatmaster?id=' + panchayatcd
    );
  }

  public PostVillagemaster(addvillage: VillageMaster) {
    // https://localhost:7108/api/Admin/Postvillagemaster

    return this.httpClient.post(
      this.Rest_API_SERVER + '/Postvillagemaster',
      addvillage
    );
  }

  public updatevillagemaster(villagecd: string, addvillage: VillageMaster) {
    //https://localhost:7108/api/Admin/Updatevillagemaster?id=006

    return this.httpClient.put(
      this.Rest_API_SERVER + '/Updatevillagemaster?id=' + villagecd,
      addvillage
    );
  }

  public Deletevillagemaster(villagecd: string) {
    //https://localhost:7108/api/Admin/Deletevillagemaster?id=006

    return this.httpClient.delete(
      this.Rest_API_SERVER + '/Deletevillagemaster?id=' + villagecd
    );
  }

  public GetOdofpcomponentselectionmaster(statecd: string, yearcd: string) {
    //https://localhost:7026/api/CoEDeatils/GetODOFPComponentmaster?statecd=21&yearcd=2021-22
    return this.httpClient.get(
      this.Rest_API_SERVER1 +
        '/GetODOFPComponentmaster?statecd=' +
        statecd +
        '&yearcd=' +
        yearcd
    );
  }

  // public getOdofpComponentselectiondata(statecd: string, yearcd: string) {


  //   return this.httpClient.get<TreeNode[]>(this.Rest_API_SERVER1 +'/GetODOFPComponentmaster?statecd=' +statecd +'&yearcd=' + yearcd);
  // }



  public PostODOFPComponentselectionmaster(
    addcomponentselection: ComponentSelectionmaster
  ) {
    // https://localhost:7026/api/CoEDeatils/PostODOFPComponentmaster

    return this.httpClient.post(
      this.Rest_API_SERVER1 + '/PostODOFPComponentmaster',
      addcomponentselection
    );
  }

  public GetODOFPAchievmentmaster(
    statecd: string,
    distcd: string,
    yearcd: string
  ) {
    //https://localhost:7026/api/CoEDeatils/GetODOFPAchievment?statecd=17&distcd=02&yearcd=2017-18
    return this.httpClient.get(
      this.Rest_API_SERVER1 +
        '/GetODOFPAchievment?statecd=' +
        statecd +
        '&distcd=' +
        distcd +
        '&yearcd=' +
        yearcd
    );
  }

  public PostODOFPAchievmentmaster(
    addcomponentachievment: ComponentAchievment
  ) {
    //https://localhost:7026/api/CoEDeatils/PostODOFPAchievmentmaster

    return this.httpClient.post(
      this.Rest_API_SERVER1 + '/PostODOFPAchievmentmaster',
      addcomponentachievment
    );
  }

  public GetStateWisephysicaltargets(
    statecd: string,
    monthcd: string,
    yearcd: string
  ) {
    //https://localhost:7026/api/CoEDeatils/GetStatewisePhysicaltargetsdata?statecd=09&monthcd=04&yearcd=2021-22
    return this.httpClient.get(
      this.Rest_API_SERVER1 +
        '/GetStatewisePhysicaltargetsdata?statecd=' +
        statecd +
        '&monthcd=' +
        monthcd +
        '&yearcd=' +
        yearcd
    );
  }

  public GetDistrictwisephsicaltargets(
    statecd: string,
    distcd: string,
    monthcd: string,
    yearcd: string
  ) {
    //https://localhost:7026/api/CoEDeatils/GetDistrictwisetargets?statecd=21&distcd=04&monthcd=04&yearcd=2023-24

    return this.httpClient.get(
      this.Rest_API_SERVER1 +
        '/GetDistrictwisetargets?statecd=' +
        statecd +
        '&distcd=' +
        distcd +
        '&monthcd=' +
        monthcd +
        '&yearcd=' +
        yearcd
    );
  }

  public PostSucessstories(file: FormData) {
    //https://localhost:7026/api/Beneficeary/PostSucessStory
    return this.httpClient.post(
      this.Rest_API_SERVER + '/PostSucessStory',
      file
    );
  }

  public GetProjectDetails(statecd: string, yearcd: string) {
    //https://localhost:7026/api/CoEDeatils/GetProjectDetails?statecd=21&yearcd=2017-18
    return this.httpClient.get(
      this.Rest_API_SERVER1 +
        '/GetProjectDetails?statecd=' +
        statecd +
        '&yearcd=' +
        yearcd
    );
  }

  public UpdateProjectdetails(addprojectdetails: Projectdetails) {
    //https://localhost:7108/api/Admin/Updatevillagemaster?id=006

    return this.httpClient.put<string>(
      this.Rest_API_SERVER1 + '/UpdateProjectdetails',
      addprojectdetails
    );
  }

  public GetProjectcatgory() {
    //https://localhost:7026/api/Beneficeary/GetProjectcategory

    return this.httpClient.get(this.Rest_API_SERVER + '/GetProjectcategory');
  }

  public GetProjectSubcategory(categoryid: string) {
    //https://localhost:7026/api/Beneficeary/GetProjectSubcategory?pcategory=10

    return this.httpClient.get(
      this.Rest_API_SERVER + '/GetProjectSubcategory?pcategory=' + categoryid
    );
  }

  public GetUnits() {
    //https://localhost:7026/api/Beneficeary/GetUnits

    return this.httpClient.get(this.Rest_API_SERVER + '/GetUnits');
  }

  public GetStatus() {
    //https://localhost:7026/api/Beneficeary/GetStatus
    return this.httpClient.get(this.Rest_API_SERVER + '/GetStatus');
  }

  public PostProjectdetailsEntry(file: FormData) {
    return this.httpClient.post(
      this.Rest_API_SERVER1 + '/PostProjectEntry',
      file,
      { responseType: 'text' }
    );
  }

  public Getstateleveldata(yearcd: string) {
    //https://localhost:7026/api/CoEDeatils/BindGridNormalData?yearcd=2017-18

    return this.httpClient.get(
      this.Rest_API_SERVER1 + '/BindGridNormalData?yearcd=' + yearcd
    );
  }
  public GetSprillstatedata(yearcd: string) {
    //https://localhost:7026/api/CoEDeatils/BindGridsprilldata?yearcd=2017-18

    return this.httpClient.get(
      this.Rest_API_SERVER1 + '/BindGridsprilldata?yearcd=' + yearcd
    );
  }

  public GetDistrictLeveldata(yearcd: string) {
    return this.httpClient.get(
      this.Rest_API_SERVER1 + '/BindGridNormalData?yearcd=' + yearcd
    );
  }

  public GetDistrictwiseReportstatus(
    yearcd: string,
    Frommonthcd: string,
    Tomonthcd: string,
    temp: string
  ) {
    //https://localhost:7026/api/CoEDeatils/GetDistrictReportstatus?yearcd=2017-18&DDLFrom=02&DDLTO=06&temp=0

    return this.httpClient.get<any[]>(
      this.Rest_API_SERVER1 +
        '/GetDistrictReportstatus?yearcd=' +
        yearcd +
        '&DDLFrom=' +
        Frommonthcd +
        '&DDLTO=' +
        Tomonthcd +
        '&temp=' +
        temp
    );
  }



  public  Loginpage(addlogindetails: LoginUser)
  {

    //https://localhost:7026/api/Login/Login

    return this.httpClient.post(this.Rest_API_SERVER2 + '/Login' , addlogindetails);

  }







}
