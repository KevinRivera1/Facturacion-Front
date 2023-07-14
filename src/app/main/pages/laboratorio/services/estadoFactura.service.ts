import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EstadoFacturaModel } from '../model/EstadoFactura';

@Injectable({
    providedIn: 'root',
})
export class EstadoFacturaService {
    private api = 'http://172.31.203.216:8081/EstadoComprobantes';

    constructor(private http: HttpClient) {}

    getAll(): Observable<any> {
        return this.http.get(this.api + '/listarEstComprobante');
    }

    saveObject(obj): Observable<any> {
        return this.http.post(this.api + '/guardarEstComprobante/', obj);
    }

    deleteObject(key): Observable<any> {
        return this.http.delete(this.api + '/eliminarEstComprobante/' + key);
    }

    createBanco(createEstaFactura: EstadoFacturaModel): Observable<any> {
        return this.http.post(
            `${this.api}/guardarEstComprobante`,
            createEstaFactura
        );
    }
}
