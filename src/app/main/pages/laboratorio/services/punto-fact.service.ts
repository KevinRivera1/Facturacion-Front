import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PuntoModel } from "../model/Punto-fact";
import {PuntoDto } from "../model/Punto-fac.dto";

@Injectable({
  providedIn: 'root'
})
export class PuntoFacService {


  private api= 'http://172.31.203.216:8081/PuntoFacturacion'

  constructor(private http: HttpClient) { }



    getAll(): Observable<any> {
        return this.http.get(this.api + '/listarPuntoFact');
    }


    saveObject(obj): Observable<any> {
        return this.http.post(this.api +  '/guardarPuntoFact/', obj);
    }


    deleteObject(key): Observable<any> {
        return this.http.delete(this.api  + '/eliminarPuntoFact/' + key);
    }


    createPunto(createPunto: PuntoModel): Observable<any>{
        return this.http.post(`${this.api}/guardarPuntoFact`, createPunto);
    }

  }

