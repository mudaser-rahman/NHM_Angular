import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DistrictMaster } from '../Model/district-master';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  // private Rest_API_Server = 'https://www.cdbapi.com/api/Location';
  private Rest_API_Server = 'https://localhost:7108/api/Location';
  constructor(private httpClient:HttpClient) { }

  public getStates(){
    return this.httpClient.get(this.Rest_API_Server+"/getAllstates");
  }
  public getDistrictByState(stateCode:string){
    alert(stateCode);
    return this.httpClient.get(this.Rest_API_Server+"/getDistrictByState?statecode="+stateCode);
  }
  public getBlockByDistrict(distCode:string){
    return this.httpClient.get(this.Rest_API_Server+"/getBlocksBydistrict?districtCode="+distCode);
  }
  public GetPanchayatByBlock(blockCode:string){
    return this.httpClient.get(this.Rest_API_Server+"/getPanchayatByBlock?blockCode="+blockCode);
  }
  public GetTahsilByDistrict(distCode:string){
    return this.httpClient.get(this.Rest_API_Server+"/getTahsilByDistrict?districtCode="+distCode);
  }
  public GetVillageByPanchayat(panchCode:string){
    return this.httpClient.get(this.Rest_API_Server+"/getVillageByPanchayat?panchayatCode="+panchCode);
  }
  public GetVillageByTehsil(tehsilCode:string){
    return this.httpClient.get(this.Rest_API_Server+"/getVillageByTehsil?tehsilCode="+tehsilCode);
  }
  public GetAgreOffiiceByBlock(blockCode:string){
    return this.httpClient.get(this.Rest_API_Server+"/getAgreOffiiceByBlock?blockCode="+blockCode);
  }
  public getCfcMaster(){
    return this.httpClient.get(this.Rest_API_Server+"/getCfcMaster");
  }
  public GetProfession(){
    return this.httpClient.get(this.Rest_API_Server+"/getProfession");
  }
  public GetCastMaster(){
    return this.httpClient.get(this.Rest_API_Server+"/getCastMaster");
  }


  public GetRoleTypes(){
    return this.httpClient.get(this.Rest_API_Server+"/roleType");
  }



  //District Master 
  public AddDistrict(districtMaster:DistrictMaster){
    return this.httpClient.post(this.Rest_API_Server+"/addDistrict",districtMaster)
  }
  public UpdateDistrict(distCode:string, districtMaster:DistrictMaster){
    return this.httpClient.put(this.Rest_API_Server+"/updateDistrict?distCode="+distCode,districtMaster)
  }
  public DeleteDistrict(distCode:string){
    return this.httpClient.put(this.Rest_API_Server+"/deleteDistrict?distCode="+distCode,"")
  }


}
