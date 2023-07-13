import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment'
import {Observable} from "rxjs";
import { CentroCostoModel } from '../model/CentroCostos';

@Injectable({
  providedIn: 'root'
})
export class CentroCostosService {

 
  private api= 'http://172.31.203.216:8081/CentroCosto'

  constructor(private http: HttpClient) { }



    getAll(): Observable<any> {
        return this.http.get(this.api + '/listarCentroCosto');
    }


    saveObject(obj): Observable<any> {
        return this.http.post(this.api +  '/guardarCentroCosto/', obj);
    }


    deleteObject(key): Observable<any> {
        return this.http.delete(this.api  + '/eliminarCentroCosto/' + key);
    }


    createCentroCosto (createCentroCosto: CentroCostoModel): Observable<any>{
        return this.http.post(`${this.api}/guardarCentroCosto`, createCentroCosto);
    }


}