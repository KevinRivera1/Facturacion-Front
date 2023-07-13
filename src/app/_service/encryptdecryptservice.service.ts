import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EncryptDecryptService {
    private key = 'EPN20182EPN20182';
    private iv = CryptoJS.enc.Utf8.parse('1203199320052021');
    constructor() {}
    // Methods for the encrypt and decrypt Using AES
    encryptUsingAES256(text): any {
        let dataJson = JSON.stringify(text);

        var encryptedData = CryptoJS.AES.encrypt(dataJson,'EPN20182EPN20182').toString();

        return encryptedData;
    }
    decryptUsingAES256(decString) {
        var decrypted = CryptoJS.AES.decrypt(decString, this.key, {
            keySize: 128 / 8,
            iv: this.iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
}
