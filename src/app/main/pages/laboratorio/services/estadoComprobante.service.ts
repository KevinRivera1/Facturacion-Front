import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EstadoComprobanteModel } from '../model/EstadoComprobante';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class EstadoComprobanteService {
    //private api = 'http://172.31.203.216:8081/EstadoComprobantes';

    private api = `${environment.HOST}/`;
    endpoint: string = 'EstadoComprobantes';

    constructor(private http: HttpClient) {}

    getAll(): Observable<any> {
        return this.http.get(
            this.api + this.endpoint + '/listarEstComprobante'
        );
    }

    saveObject(obj): Observable<any> {
        return this.http.post(
            this.api + this.endpoint + '/guardarEstComprobante/',
            obj
        );
    }

    deleteObject(key): Observable<any> {
        return this.http.delete(
            this.api + this.endpoint + '/eliminarEstComprobante/' + key
        );
    }

    createEstadoComp(
        createEstaComprobante: EstadoComprobanteModel
    ): Observable<any> {
        return this.http.post(
            `${this.api}/guardarEstComprobante`,
            createEstaComprobante
        );
    }
}
