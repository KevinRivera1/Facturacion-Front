import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment'
import {Observable} from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class ConceptoLiquidacionServiceService {
    constructor(private http: HttpClient) {
    }

    url = `${environment.HOST}/`;
    endpoint: string = 'conceptoliquidacion';

    saveObject(obj): Observable<any> {
        return this.http.post(this.url + this.endpoint + '/guardarConceptosLiquidacion', obj);
    }

    getAll(): Observable<any> {
        return this.http.get(this.url + this.endpoint + '/listaConceptosLiquidacion');
    }

    getById(key): Observable<any> {
        return this.http.get(this.url + this.endpoint + '/findIdConceptoLiquidacion/' + key);
    }




    deleteObject(key): Observable<any> {
        return this.http.delete(this.url + this.endpoint + '/eliminarConceptoLiquidacion/' + key);
    }

}
