import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConceptoModel } from '../model/Concepto';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ConceptoService {
    //private api= 'http://172.31.203.216:8081/Concepto'

    constructor(private http: HttpClient) {}
    url = `${environment.HOST}/`;
    endpoint: string = 'Concepto';

    url1 = `${environment.HOST}/`;
    endpoint1: string = 'TipoConcepto';

    getAll(): Observable<any> {
        return this.http.get(this.url + this.endpoint + '/listaConceptos');
    }

    getIva(): Observable<any> {
        return this.http.get(this.url + this.endpoint + '/listaIva');
    }

    getTc(): Observable<any> {
      return this.http.get(this.url1 + this.endpoint1 + '/listarTipoConcepto');
  }


    saveObject(obj): Observable<any> {
        return this.http.post(
            this.url + this.endpoint + '/guardarConceptos',
            obj
        );
    }

    deleteObject(key): Observable<any> {
        return this.http.delete(
            this.url + this.endpoint + '/eliminarConceptos/' + key
        );
    }

    createConcepto(createConcepto: ConceptoModel): Observable<any> {
        return this.http.post(`${this.url}/guardarConceptos`, createConcepto);
    }
}
