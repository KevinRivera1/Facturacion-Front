import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotaCreditoModel } from '../model/NotaCredito';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class NotaCreditoService {

    constructor(private http: HttpClient) { }
    url = `${environment.HOST}/`;
    endpoint: string = 'notaCredito';

    getAll(): Observable<any> {
        return this.http.get(this.url + this.endpoint + '/listarNotaCredito');
    }

    saveObject(obj): Observable<any> {
        return this.http.post(
            this.url + this.endpoint + '/guardarNotaCredito',
            obj
        );
    }

    deleteObject(key): Observable<any> {
        return this.http.delete(
            this.url + this.endpoint + '/eliminarNotaCredito/' + key
        );
    }

    createConcepto(createNotaCredito: NotaCreditoModel): Observable<any> {
        return this.http.post(`${this.url}/guardarNotaCredito`, createNotaCredito);
    }
}
