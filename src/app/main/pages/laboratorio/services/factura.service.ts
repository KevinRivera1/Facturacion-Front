import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FacturaService {
    endpoint: string = 'factura';
      url = `${environment.HOST}/`;

  constructor(private http: HttpClient) { }


  getAll(): Observable<any> {
    return this.http.get(this.url + this.endpoint + '/listarFactura');
}

  saveObject(obj): Observable<any> {
    return this.http.post(this.url + this.endpoint + '/guardarFactura/', obj);
}
}
