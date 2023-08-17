import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BancosModel } from "../model/Bancos";
import {BancoDto } from "../model/Bancos.dto";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {



  endpoint: string = 'Tarjeta';
  url = `${environment.HOST}/`;

constructor(private http: HttpClient) { }


getAll(): Observable<any> {
  return this.http.get(this.url + this.endpoint + '/listTarjeta');
}




  }

