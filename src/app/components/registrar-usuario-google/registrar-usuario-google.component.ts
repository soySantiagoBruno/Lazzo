import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegisterFormGoogleService as RegisterFormGoogleService } from '../../forms/register-form-google.service';
import { UbicacionApiService } from '../../services/ubicacion-api.service';
import { UserService } from '../../services/user.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-registrar-usuario-google',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './registrar-usuario-google.component.html',
  styleUrl: './registrar-usuario-google.component.css'
})

/* Esto sirve para terminar de completar el registro de un usuario que se loguea mediante Google, esto debido a que además de un correo (que nos proporciona Google), también necesitamos otros datos como nombre, celular, provincia y municipio.
 */
export class RegistrarUsuarioGoogleComponent {

  // Esto será usado en el dropdown de ubicación
  provincias: string[] = [];
  municipios: string[] = [];
  tocado: boolean = false;

  formularioRegisterGoogle: FormGroup;


  constructor(
    private registerFormGoogleService: RegisterFormGoogleService, 
    private userService: UserService, 
    private router: Router,
    private ubicacionApiService: UbicacionApiService,
  ){
    // Creo el formulario a usar para el registro
    this.formularioRegisterGoogle = registerFormGoogleService.createRegisterGoogleForm();
  }

   ngOnInit(): void {
    this.cargarProvincias();
    this.desabilitarSelectMunicipio()
  }

  onSubmit(){
    // Convertir el valor de "tieneWhatsapp" a booleano (true o false) para ser cargado en el sistema
    if (this.formularioRegisterGoogle.value.tieneWhatsapp === "true") {
      this.formularioRegisterGoogle.value.tieneWhatsapp = true; 
    } else if(this.formularioRegisterGoogle.value.tieneWhatsapp === "false"){
      this.formularioRegisterGoogle.value.tieneWhatsapp = false; 
    }

    
    this.userService.registerUsuarioGoogle(this.formularioRegisterGoogle.value) // Le pasamos los VALORES del formulario necesarios para el registro
    .then(response => {      
      // En caso de que el registro sea exitoso, redirije al /home-usuario
      this.router.navigate(["/home-usuario"])
    })

    .catch(error => console.log(error))
  }


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
    this.formularioRegisterGoogle.get('provincia')?.valueChanges.subscribe(() => {
      const provinciaControl = this.formularioRegisterGoogle.get('provincia');
      
      if (provinciaControl?.dirty && provinciaControl.value) {
        // Habilitar el campo de municipio si la provincia fue modificada y tiene un valor
        this.formularioRegisterGoogle.get('municipio')?.enable();
        this.cargarMunicipios(provinciaControl.value);
        this.tocado = true;
      } else {
        // Deshabilitar el campo de municipio si no se ha seleccionado una provincia
        this.formularioRegisterGoogle.get('municipio')?.disable();
      }
    });

    // Inicialmente deshabilitar el campo de municipio
    this.formularioRegisterGoogle.get('municipio')?.disable();
  }

}