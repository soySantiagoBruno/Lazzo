import { Component, OnInit } from '@angular/core';
import { FooterDarkComponent } from "../footers/footer-dark/footer-dark.component";
import { NavbarUsuarioComponent } from "../navbars/navbar-usuario/navbar-usuario.component";
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PublicarMascotaFormService } from '../../forms/publicar-mascota-form.service';
import { UbicacionApiService } from '../../services/ubicacion-api.service';
import { NgForOf, NgIf } from '@angular/common';
import { MascotaService } from '../../services/mascota.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publicar-mascota',
  standalone: true,
  imports: [FooterDarkComponent, NavbarUsuarioComponent, ReactiveFormsModule, NgForOf, NgIf],
  templateUrl: './publicar-mascota.component.html',
  styleUrl: './publicar-mascota.component.css'
})
export class PublicarMascotaComponent implements OnInit{

  publicarMascotaForm: FormGroup;

  // Esto será usado en el dropdown de ubicación
  provincias: string[] = [];
  municipios: string[] = [];
  tocado: boolean = false;


  constructor(
    private mascotaService: MascotaService,
    private publicarMascotaFormService: PublicarMascotaFormService,
    private ubicacionApiService: UbicacionApiService,
    private router: Router
  ){
    this.publicarMascotaForm = publicarMascotaFormService.createPublicarMascotaForm();
  }


  ngOnInit(): void {
    this.cargarProvincias();
    this.desabilitarSelectMunicipio()
    }


  registrarMascota(){
    this.mascotaService.registrarMascota(this.publicarMascotaForm.value)
    .then(response=>{
      console.log("Registro exitoso")
      this.router.navigate(["/home-usuario"]) 
    })
    
  }


// TO-DO cambiar los service de provincia y municipio (DEPARTAMENTO) por el nuevo service3
  cargarProvincias(): void{
    this.ubicacionApiService.getProvincias().subscribe((data: string[]) =>{
      this.provincias = data
    })
  }

  cargarMunicipios(provincia: string){
    this.ubicacionApiService.getMunicipios(provincia).subscribe(data => this.municipios = data
    )
  }

  desabilitarSelectMunicipio(){
    // Escuchar cambios en el campo de provincia
    this.publicarMascotaForm.get('provincia')?.valueChanges.subscribe(() => {
      const provinciaControl = this.publicarMascotaForm.get('provincia');
      
      if (provinciaControl?.dirty && provinciaControl.value) {
        // Habilitar el campo de municipio si la provincia fue modificada y tiene un valor
        this.publicarMascotaForm.get('municipio')?.enable();
        this.cargarMunicipios(provinciaControl.value);
        this.tocado = true;
      } else {
        // Deshabilitar el campo de municipio si no se ha seleccionado una provincia
        this.publicarMascotaForm.get('municipio')?.disable();
      }
    });

    // Inicialmente deshabilitar el campo de municipio
    this.publicarMascotaForm.get('municipio')?.disable();
  }

}
