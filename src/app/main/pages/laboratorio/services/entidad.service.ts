import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment'
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EntidadService {
    constructor(private http: HttpClient) {
    }

    url = `${environment.HOST}/`;
    endpoint: string = 'private';

    saveObject(obj): Observable<any> {
        return this.http.post(this.url + this.endpoint + '/guardarEntidad', obj);
    }

    getAll(): Observable<any> {
        return this.http.get(this.url + this.endpoint + '/listaEntidad');
    }

    getById(key): Observable<any> {
        return this.http.get(this.url + this.endpoint + '/buscarPorIdEntidad/' + key);
    }

    deleteObject(key): Observable<any> {
        return this.http.delete(this.url + this.endpoint + '/eliminarEntidad/' + key);
    }
}
