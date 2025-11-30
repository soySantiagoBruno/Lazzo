import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UbicacionService } from '../../services/ubicacion.service';
import { NgForOf } from '@angular/common';
import { ProvinciaDto } from '../../models/provincia-dto';
import { DepartamentoDto } from '../../models/departamento-dto';


@Component({
  selector: 'app-filtro',
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.css'
})
export class FiltroComponent implements OnInit {

  formularioFiltro: FormGroup

  provincias: ProvinciaDto[] = [];
  departamentos: DepartamentoDto[] = [];
  departamentosFiltrados: any[] = []; // <- lista filtrada por provincia


  constructor(private ubicacionService: UbicacionService, private form: FormBuilder) {
    
      // Creo el formulario de filtro, departamento deshabilitado inicialmente
    this.formularioFiltro = this.form.group({
      provincia: [''],
      departamento: [{ value: '', disabled: true }], // <-- disabled hasta elegir provincia
      tipo: [''],
      sexo: [''],
      tamaño: [''],
      edad: ['']
    });
  }



  ngOnInit() {
    //TO-DO esto se puede refactorizar en un solo método

    // Cargo provincias y departamentos
    this.ubicacionService.getProvincias().subscribe(p => this.provincias = p || []);

    this.ubicacionService.getDepartamentos().subscribe(d => {
      this.departamentos = d || [];
      // si ya hay provincia seleccionada (ej. por rehidratación), aplica filtro
      const currentProv = this.formularioFiltro.get('provincia')?.value;
      this.applyProvinciaFilter(currentProv);
    });

    // Suscribo el cambio de provincia para filtrar departamentos
    this.formularioFiltro.get('provincia')?.valueChanges.subscribe(provId => this.applyProvinciaFilter(provId));
  }


  applyProvinciaFilter(provId: string | null | undefined) {
    const departamentoControl = this.formularioFiltro.get('departamento');

    if (provId) {
      // habilita y filtra por idProvincia
      departamentoControl?.enable();
      this.departamentosFiltrados = this.departamentos.filter(d => d.idProvincia === provId || d.idProvincia === String(provId));
    } else {
      // si viene vacío, deshabilita y vacía
      departamentoControl?.reset();
      departamentoControl?.disable();
      this.departamentosFiltrados = [];
    }
  }


aplicarFiltro() {
  console.log("Filtro aplicado!", this.formularioFiltro.value);
  /* const collapseEl = document.getElementById('collapseExample');
  const collapse = bootstrap.Collapse.getOrCreateInstance(collapseEl);
  collapse.hide(); */
}


}
