import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConceptoModel } from '../model/Concepto';


@Injectable({
  providedIn: 'root'
})
export class ConceptoService {


  private api= 'http://172.31.203.246:8081/conceptos'

  constructor(private http: HttpClient) { }



    getAll(): Observable<any> {
        return this.http.get(this.api + '/listaConceptos');
    }


    saveObject(obj): Observable<any> {
        return this.http.post(this.api +  '/guardarConceptos/', obj);
    }


    deleteObject(key): Observable<any> {
        return this.http.delete(this.api  + '/eliminarConceptos/' + key);
    }


    createConcepto(createConcepto: ConceptoModel): Observable<any>{
        return this.http.post(`${this.api}/guardarConceptos`, createConcepto);
    }




  }

