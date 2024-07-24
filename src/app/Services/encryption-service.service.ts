import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoTS from 'crypto-js';
import { Credentials } from '../Model/credentials';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  key: string = "abcdefghijklmnopqrstuvwxyz0987654321coconut";
  private Rest_API = 'https://localhost:7108/api/Token';
  constructor(private httpClient:HttpClient) { }

  encryptionAES (msg:string) {
    // Encrypt
    const ciphertext = CryptoTS.AES.encrypt(msg, this.key);
    return ciphertext.toString();
  }

  decryptionAES (msg:string) {
    // Decrypt
    const bytes  = CryptoTS.AES.decrypt(msg, this.key);
    const plaintext = bytes.toString(CryptoTS.enc.Utf8);
    return plaintext;
  }

  public isCorrectUser(credentials:Credentials){
    return this.httpClient.post<boolean>(this.Rest_API+"/login",credentials);
  }
  public checkLogin(){
    return true;
    // const isLogined = localStorage.getItem('isLogined');
    // return isLogined == "True" ? true:false;
  }
}
