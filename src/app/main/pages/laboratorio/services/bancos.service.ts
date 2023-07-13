import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BancosModel } from "../model/Bancos";
import {BancoDto } from "../model/Bancos.dto";

@Injectable({
  providedIn: 'root'
})
export class BancosService {


  private api= 'http://172.31.203.216:8081/bancos'

  constructor(private http: HttpClient) { }



    getAll(): Observable<any> {
        return this.http.get(this.api + '/listarBancos');
    }


    saveObject(obj): Observable<any> {
        return this.http.post(this.api +  '/guardarBancos/', obj);
    }


    deleteObject(key): Observable<any> {
        return this.http.delete(this.api  + '/eliminarBancos/' + key);
    }


    createBanco(createBanco: BancosModel): Observable<any>{
        return this.http.post(`${this.api}/guardarBancos`, createBanco);
    }




  }

