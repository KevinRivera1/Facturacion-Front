import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CentroCostoModel } from '../model/CentroCosto';

@Injectable({
    providedIn: 'root',
})
export class CentroCostosService {
    private url = 'http://172.31.203.216:8081/CentroCosto';

    constructor(private http: HttpClient) {}

    getAllC(): Observable<any> {
        return this.http.get(this.url + '/listarCentroCosto');
    }

    saveObjectC(obj): Observable<any> {
        return this.http.post(this.url + '/guardarCentroCosto/', obj);
    }

    deleteObjectC(key): Observable<any> {
        return this.http.delete(this.url + '/eliminarCentroCosto/' + key);
    }

    createCentroCostoC(createCentroCosto: CentroCostoModel): Observable<any> {
        return this.http.post(
            `${this.url}/guardarCentroCosto`,
            createCentroCosto
        );
    }
}
