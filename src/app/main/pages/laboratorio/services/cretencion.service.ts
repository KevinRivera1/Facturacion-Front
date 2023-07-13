import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {Observable} from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class CretencionService {


    constructor(private http: HttpClient) {
    }

    url = `${environment.HOST}/`;
    endpoint: string = 'cretencion';


    saveObject(obj): Observable<any> {
        return this.http.post(this.url + this.endpoint + '/guardarCretencion', obj);
    }

    getAll(): Observable<any> {
        return this.http.get(this.url + this.endpoint + '/listarCretencion');
    }

    getById(key): Observable<any> {
        return this.http.get(this.url + this.endpoint + '/buscarPorIdCretencion/' + key);
    }




    deleteObject(key): Observable<any> {
        return this.http.delete(this.url + this.endpoint + '/eliminarCretencion/' + key);
    }
}
