import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProvinciaDto } from '../models/provincia-dto';
import { map } from 'rxjs';
import { DepartamentoDto } from '../models/departamento-dto';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {
  constructor(private http: HttpClient) {}

  getProvincias() {
    return this.http.get<ProvinciaDto[]>('assets/provincias.json');
  }

  getDepartamentos() {
    return this.http.get<DepartamentoDto[]>('assets/departamentos.json');
  }

  getDepartamentoPorProvincia(provinciaId: string) {
    return this.http.get<ProvinciaDto[]>('assets/departamentos.json').pipe(
      map((departamentos: any[]) => 
        departamentos.filter(departamento => departamento.provinciaId === provinciaId)
      )
    );
  }
}