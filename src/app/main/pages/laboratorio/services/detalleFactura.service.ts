import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DetalleFacturaService {
  constructor(private http: HttpClient) { }
  url = `${environment.HOST}/`;
  endpoint: string = 'detalleFactura';

  getAll(): Observable<any> {
    return this.http.get(this.url + this.endpoint + '/listarDetalleFactura');
  }

  saveObject(obj): Observable<any> {
    return this.http.post(this.url + this.endpoint + '/guardarDetalleFactura/', obj);
  }
}