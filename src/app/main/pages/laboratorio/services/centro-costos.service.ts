import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CentroCostoModel } from '../model/CentroCosto';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CentroCostosService {
    // private url = 'http://172.31.203.246:8081/';
    // endpoint: string = 'centrocosto';

    url = `${environment.HOST}`;
    endpoint: string = '/CentroCosto';

    constructor(private http: HttpClient) {}

    getAllC(): Observable<any> {
        return this.http.get(this.url + this.endpoint + '/listarCentroCosto');
    }

    saveObjectC(obj): Observable<any> {
        return this.http.post(this.url + this.endpoint + '/guardarCentroCosto/', obj);
    }

    deleteObjectC(key): Observable<any> {
        return this.http.delete(this.url + this.endpoint + '/eliminarCentroCosto/' + key);
    }

    createCentroCostoC(createCentroCosto: CentroCostoModel): Observable<any> {
        return this.http.post(
            `${this.url + this.endpoint}/guardarCentroCosto`,
            createCentroCosto
        );
    }

    
}
