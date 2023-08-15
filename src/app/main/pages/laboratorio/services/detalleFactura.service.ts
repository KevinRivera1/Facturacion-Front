import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DetalleFacturaService {
    endpoint: string = 'detalleFactura';
      url = `${environment.HOST}/`;

  constructor(private http: HttpClient) { }


  getAll(): Observable<any> {
    return this.http.get(this.url + this.endpoint + '/listarDetalleFactura');
}

  saveObject(obj): Observable<any> {
    return this.http.post(this.url + this.endpoint + '/guardarDetalleFactura/', obj);
}
}