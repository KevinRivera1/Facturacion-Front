import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BancosModel } from "../model/Bancos";
import {BancoDto } from "../model/Bancos.dto";
import { FormaPagoModel } from '../model/FormaPago';

@Injectable({
  providedIn: 'root'
})
export class FormaPagoService {


  private api= 'http://172.31.203.216:8081/FormaPago'

  constructor(private http: HttpClient) { }



    getAll(): Observable<any> {
        return this.http.get(this.api + '/listaFormaPago');
    }


    saveObject(obj): Observable<any> {
        return this.http.post(this.api +  '/guardarFormaPago/', obj);
    }


    deleteObject(key): Observable<any> {
        return this.http.delete(this.api  + '/eliminarFormaPago/' + key);
    }


    createBanco(createFormaPago: FormaPagoModel): Observable<any>{
        return this.http.post(`${this.api}/guardarFormaPago`, createFormaPago);
    }

  }
