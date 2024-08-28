import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UbicacionApiService {

  private provinciasUrl = 'https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre';
  private municipiosUrl = 'https://apis.datos.gob.ar/georef/api/municipios?campos=nombre&provincia=';


  constructor(private http: HttpClient) { }

  getProvincias(): Observable<string[]> {
    return this.http
      .get(this.provinciasUrl)
      .pipe(
        map((data: any) => {

          let provincias: string[] = [];
          for (let index = 0; index < data.provincias.length; index++) {
            provincias.push(data.provincias[index].nombre);   
          }
          
          return provincias;
        })
      )
  }


  getMunicipios(provincia: string): Observable<any>{
    return this.http
    .get(`${this.municipiosUrl}${provincia}`)
    .pipe(
      map((data:any) =>{
        
        let municipios: any[] = [];
        for (let index = 0; index < data.municipios.length; index++) {
          municipios.push(data.municipios[index].nombre);
        }
        return municipios;
      }

      )
    )
  }
  

}
