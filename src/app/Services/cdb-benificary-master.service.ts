import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CdbBenificiaryMaster } from '../Model/cdb-benificiary-master';
import { BankDetails } from '../Model/bank-details';
import { IdentityTypesMaster } from '../Model/identity-types-master';
import { Observable } from 'rxjs';
import { LandDetails } from '../Model/land-details';
import { BeneficiaryDocuments } from '../Model/beneficiary-documents';

@Injectable({
  providedIn: 'root'
})
export class CdbBenificaryMasterService {

  private Rest_API_Benficiary = 'https://localhost:7108/api/CdbBeneficiaryMasters';
  //  private Rest_API_Benficiary = 'https://www.cdbapi.com/api/CdbBeneficiaryMasters';
  // private Rest_API_Benficiary = 'http://10.160.21.196:8078/api/CdbBeneficiaryMasters'; 

  constructor(private httpClient:HttpClient) { }

  public postBenificiaryAddress(cdbBenificiaryMaster:CdbBenificiaryMaster){
    return this.httpClient.post<string>(this.Rest_API_Benficiary,cdbBenificiaryMaster);
  }
  public postBenificiaryBankDetails(bankDetails:BankDetails){
    return this.httpClient.post(this.Rest_API_Benficiary+"/postBenificiaryBankDetail",bankDetails);
  }
  public postIdentityDetails(postIdentityDetails:IdentityTypesMaster[]){
    return this.httpClient.post(this.Rest_API_Benficiary+"/postBeneficiaryIdentityDetails",postIdentityDetails);
  }
  public postLandDetails(postLandDetails:LandDetails[]){
    return this.httpClient.post(this.Rest_API_Benficiary+"/postBeneficiaryLandDetails",postLandDetails);
  }
  public postDocument(beneficiaryId:string,documentTypeId:number,DocumentId:number,file:FormData){
    return this.httpClient.post(this.Rest_API_Benficiary+"/postBeneficiaryDocument?beneficiaryId="+beneficiaryId+"&documentTypeId="+documentTypeId+"&DocumentId="+DocumentId,file);
  }
  public putLinkToCfc(beneficiaryId:string,cfcId:string){
    return this.httpClient.put(this.Rest_API_Benficiary+"/linkToCfc?benId="+beneficiaryId+"&cfcId="+cfcId,null);
  }


  public getIdentityTypes(): Observable<IdentityTypesMaster[]>{
    return this.httpClient.get<IdentityTypesMaster[]>(this.Rest_API_Benficiary+"/identityTypeMaster");
  }

  public getAllBanks(){
    return this.httpClient.get(this.Rest_API_Benficiary+"/getAllBanks");
  }
  public getAllBranch(){
    return this.httpClient.get(this.Rest_API_Benficiary+"/getAllBranch");
  }

  public getBankByState(stateCode:string){
    return this.httpClient.get(this.Rest_API_Benficiary+"/getBankByState?stateCode="+stateCode);
  }
  public getBranchByDistrictAndBank(distCode:string,BankCode:string){
    return this.httpClient.get(this.Rest_API_Benficiary+"/getBranchsByDistrictAndBank?distCode="+distCode+"&bankCode="+BankCode);
  }
  public getSoilTypes(){
    return this.httpClient.get(this.Rest_API_Benficiary+"/getSoilTypes");
  }
  public getWaterSourceTypes(){
    return this.httpClient.get(this.Rest_API_Benficiary+"/getWaterSourceTypes");
  }
  public getOwnershipTypes(){
    return this.httpClient.get(this.Rest_API_Benficiary+"/getOwnershipTypes");
  }
  public getCoconutVerity(){
    return this.httpClient.get(this.Rest_API_Benficiary+"/getCoconutverity");
  }
  public getDocumentTypes(){
    return this.httpClient.get(this.Rest_API_Benficiary+"/getDocumentTypes");
  }

  // public GetDocumentByBenficiary(beneficiaryId:string, documentTypeId:number):Observable<Blob>{

  //   return this.httpClient.get(this.Rest_API_Benficiary+"/getDocumentByBenficiaryId?beneficiaryId="+beneficiaryId+"&documentType="+documentTypeId,{
  //     params: { beneficiaryId, documentType: documentTypeId.toString() },
  //     responseType: 'blob',
  //   });
  // }

  public GetDocumentByBenficiary(beneficiaryId:string, documentTypeId:number): Observable<BeneficiaryDocuments>{
    const url = `${this.Rest_API_Benficiary}/getDocumentByBenficiaryId?beneficiaryId=${beneficiaryId}&documentType=${documentTypeId}`;
    return this.httpClient.get<BeneficiaryDocuments>(url);
  }


  //Update Beneficiary Details

  getBeneficiaryDetailsById(benId:string){
    return this.httpClient.get(this.Rest_API_Benficiary+"/getBeneficiaryByBenId?benId="+benId);
  }

  public putBenificiaryAddress(benId:string,cdbBenificiaryMaster:CdbBenificiaryMaster){
    return this.httpClient.put<boolean>(this.Rest_API_Benficiary+"/"+benId,cdbBenificiaryMaster);
  }

  identityDetailsByBenId(benId:string):Observable<IdentityTypesMaster[]>{
    return this.httpClient.get<IdentityTypesMaster[]>(this.Rest_API_Benficiary+"/identityDetailsByBenId?benId="+benId);
  }

  getBeneficiaryBankDetails(benId:string){
    return this.httpClient.get(this.Rest_API_Benficiary+"/getBeneficiaryBankDetails?benId="+benId);
  }

  getBeneficiaryLandDetails(benId:string){
    return this.httpClient.get(this.Rest_API_Benficiary+"/getBeneficiaryLandDetails?benId="+benId);
  }
}
