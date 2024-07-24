import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CfcDetails } from '../Model/cfc-details';
import { PresidentDetails } from '../Model/president-details';
import { SecretratyDetails } from '../Model/secretraty-details';
import { CfcMaster } from '../Model/cfc-master';
import { MemberDetails } from '../Model/member-details';

@Injectable({
  providedIn: 'root'
})
export class CfcDetailsService {

  private Rest_API_Server = 'https://hortnet.gov.in/cdbSub/api/CfcDetails';
  private Rest_API_President = 'https://localhost:7108/api/CfcPresidentDetails';
  private Rest_API_Secretraty = 'https://localhost:7108/api/CfcSecretratyDetails';
  private Rest_API_Member = 'https://localhost:7108/api/CfcMembersDetails';

  // private Rest_API_Server = 'https://www.cdbapi.com/api/CfcDetails';
  // private Rest_API_President = 'https://www.cdbapi.com/api/CfcPresidentDetails';
  // private Rest_API_Secretraty = 'https://www.cdbapi.com/api/CfcSecretratyDetails';
  // private Rest_API_Member = 'https://www.cdbapi.com/api/CfcMembersDetails';
  constructor(private httpClient:HttpClient) { }

  // CfC Details
  public postCfcDetails(cfcDetails:CfcDetails){
    return this.httpClient.post<string>(this.Rest_API_Server,cfcDetails);
  }
  public getCfcReport(){
    return this.httpClient.get(this.Rest_API_Server+"/getCfcReport");
  }
  public getCfcByDistrict(districtCode:string){
    return this.httpClient.get(this.Rest_API_Server+"/cfcByDistrict?districtCode="+districtCode);
  }

  //CFC Master
  public getCfcMaster(cfcId:string){
    return this.httpClient.get(this.Rest_API_Server+"/"+cfcId);
  }
  public postCfcMaster(cfcMaster:CfcMaster){
    return this.httpClient.post(this.Rest_API_Server+"/postCfcMaster",cfcMaster);
  }

  //CFC President
  public postCfcPresident(presidentDetails:PresidentDetails){
    return this.httpClient.post(this.Rest_API_President,presidentDetails);
  }

  public getCfcPresident(cfcId:string){
    return this.httpClient.get(this.Rest_API_President+"/"+cfcId);
  }

  //CfC Secratrat
  public postCfcSecratrat(secretratyDetails:SecretratyDetails){
    return this.httpClient.post(this.Rest_API_Secretraty,secretratyDetails);
  }

  public getCfcSecratrat(cfcId:string){
    return this.httpClient.get(this.Rest_API_Secretraty+"/"+cfcId);
  }

  //CFC Member
  public postCfcMember(memberDetails:MemberDetails){
    return this.httpClient.post(this.Rest_API_Member,memberDetails);
  }

  public getCfcMember(cfcId:string){
    return this.httpClient.get(this.Rest_API_Member+"/"+cfcId);
  }
}
