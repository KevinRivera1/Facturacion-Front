import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReciboCaja } from '../model/reciboCaja';

@Injectable({
    providedIn: 'root',
})
export class ReciboCajaService {
    private api = `${environment.HOST}/`;
    endpoint: string = 'recibocaja';

    constructor(private http: HttpClient) {}

    getAll(): Observable<any> {
        return this.http.get(this.api + this.endpoint + '/listarReciboCaja');
    }

    saveObject(obj): Observable<any> {
        return this.http.post(
            this.api + this.endpoint + '/guardarReciboCaja/',
            obj
        );
    }

    createEstadoComp(createReciboCaja: ReciboCaja): Observable<any> {
        return this.http.post(
            `${this.api}/guardarReciboCaja`,
            createReciboCaja
        );
    }
}
