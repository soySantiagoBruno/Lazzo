import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {
  constructor(private http: HttpClient) {}

  getProvincias() {
    return this.http.get<any[]>('assets/provincias.json');
  }

  getDepartamentos() {
    return this.http.get<any[]>('assets/departamentos.json');
  }
}