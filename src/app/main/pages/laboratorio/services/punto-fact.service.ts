import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PuntoModel } from "../model/Punto-fact";
import { PuntoDto } from "../model/Punto-fac.dto";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PuntoFacService {


  //private api= 'http://172.31.203.216:8081/PuntoFacturacion'
  //private api= 'http://172.31.203.216:8081/private'

  constructor(private http: HttpClient) { }
  url = `${environment.HOST}/`;
  endpoint: string = 'PuntoFacturacion';

  url1 = `${environment.HOST}/`;
  endpoint1: string = 'private';

  url2 = `${environment.HOST}/`;
  endpoint2: string = 'Caja';



  getAll(): Observable<any> {
    return this.http.get(this.url + this.endpoint + '/listarPuntoFact');
  }

  getAllUs(): Observable<any> {
    return this.http.get(this.url1 + this.endpoint1 + '/listByIdActivo');
    // return this.http.get(this.api +  '/listByIdActivo');
  }
  getAllCaj(): Observable<any> {
    return this.http.get(this.url2 + this.endpoint2 + '/listarCaja');
  }




  saveObject(obj): Observable<any> {
    return this.http.post(this.url + this.endpoint + '/guardarPuntoFact/', obj);
  }


  deleteObject(key): Observable<any> {
    return this.http.delete(this.url + this.endpoint + '/eliminarPuntoFact/' + key);
  }


  createPunto(createPunto: PuntoModel): Observable<any> {
    return this.http.post(`${this.url}/guardarPuntoFact`, createPunto);
  }

}

