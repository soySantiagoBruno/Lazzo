import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UbicacionService } from '../../services/ubicacion.service';


@Component({
  selector: 'app-filtro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.css'
})
export class FiltroComponent implements OnInit {

  provincias: any[] = [];
  departamentos: any[] = [];

  constructor(private ubicacionService: UbicacionService) { }

  ngOnInit() {
  this.ubicacionService.getProvincias().subscribe(p => this.provincias = p);
  this.ubicacionService.getDepartamentos().subscribe(d => this.departamentos = d);
}


  ubicacion = new FormControl('');


aplicarFiltro() {
  console.log("Filtro aplicado!");

  /* const collapseEl = document.getElementById('collapseExample');
  const collapse = bootstrap.Collapse.getOrCreateInstance(collapseEl);
  collapse.hide(); */
}


}
