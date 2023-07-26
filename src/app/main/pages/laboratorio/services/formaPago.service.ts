import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BancosModel } from "../model/Bancos";
import {BancoDto } from "../model/Bancos.dto";
import { FormaPagoModel } from '../model/FormaPago';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormaPagoService {

  //private url = 'http://172.31.203.246:8081/';
 
  constructor(private http: HttpClient) { }
  endpoint: string = 'FormaPago';
  url = `${environment.HOST}/`;

    getAll(): Observable<any> {
        return this.http.get(this.url + this.endpoint + '/listaFormaPago');
    }

    saveObject(obj): Observable<any> {
        return this.http.post(this.url + this.endpoint + '/guardarFormaPago/', obj);
    }

    deleteObject(key): Observable<any> {
        return this.http.delete(this.url + this.endpoint +'/eliminarFormaPago/' + key);
    }

    createBanco(createFormaPago: FormaPagoModel): Observable<any>{
        return this.http.post(`${this.url + this.endpoint}/guardarFormaPago`, createFormaPago);
    }

  }
