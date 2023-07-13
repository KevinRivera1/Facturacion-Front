import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {Observable} from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class ConsultasService {


    constructor(private http: HttpClient) {
    }

    url = `${environment.HOST}/`;
    endpoint: string = 'consultas';


    getByIdParametro(cedula, nombre, opcion): Observable<any> {
        return this.http.get(this.url + this.endpoint + '/buscarClientes/' + cedula + '/' + nombre + '/' + opcion);
    }





}
