import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoConceptoModel } from '../model/TipoConcepto';

@Injectable({
  providedIn: 'root'
})
export class TipoConceptoService {

  private api= 'http://172.31.203.246:8081/Concepto'

  constructor(private http: HttpClient) { }



    getAll(): Observable<any> {
        return this.http.get(this.api + '/listarConcepto');
    }


    saveObject(obj): Observable<any> {
        return this.http.post(this.api +  '/guardarConcepto/', obj);
    }


    deleteObject(key): Observable<any> {
        return this.http.delete(this.api  + '/eliminaConcepto/' + key);
    }


    createBanco(createTipoConcepto: TipoConceptoModel): Observable<any>{
        return this.http.post(`${this.api}/guardarTipoConcepto`, createTipoConcepto);
    }





}
