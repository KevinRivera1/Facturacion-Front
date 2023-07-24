import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoConceptoModel } from '../model/TipoConcepto';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TipoConceptoService {
  constructor(private http: HttpClient) { }

  url = `${environment.HOST}/`;
  endpoint: string = 'TipoConcepto';

  saveObject(obj): Observable<any> {
    return this.http.post(this.url + this.endpoint + '/guardarTipoConcepto', obj);
  }

  getAll(): Observable<any> {
    return this.http.get(this.url + this.endpoint + '/listarTipoConcepto');
  }


  deleteObject(key): Observable<any> {
    return this.http.delete(this.url + this.endpoint +'/eliminaConcepto/' + key);
  }

  getAllUn(): Observable<any> {
    return this.http.get(this.url+ this.endpoint + '/listarUnidad');
  }

  createBanco(createTipoConcepto: TipoConceptoModel): Observable<any> {
    return this.http.post(`${this.url+ this.endpoint}/guardarTipoConcepto`, createTipoConcepto);
  }
}


// @Injectable({
//   providedIn: 'root'
// })
// export class TipoConceptoService {

//   private api= 'http://172.31.203.216:8081/TipoConcepto'

//   constructor(private http: HttpClient) { }



//     getAll(): Observable<any> {
//         return this.http.get(this.api + '/listarTipoConcepto');
//     }

//     getAllUn(): Observable<any> {
//         return this.http.get(this.api + '/listarUnidad');
//     }


//     saveObject(obj): Observable<any> {
//         return this.http.post(this.api +  '/guardarTipoConcepto/', obj);
//     }


//     deleteObject(key): Observable<any> {
//         return this.http.delete(this.api  + '/eliminaConcepto/' + key);
//     }


//     createBanco(createTipoConcepto: TipoConceptoModel): Observable<any>{
//         return this.http.post(`${this.api}/guardarTipoConcepto`, createTipoConcepto);
//     }

// }
