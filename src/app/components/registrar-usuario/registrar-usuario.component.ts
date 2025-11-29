import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { RegisterFormService } from '../../forms/register-form.service';
import { UbicacionApiService } from '../../services/ubicacion-api.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-registrar-usuario',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.css'
})
export class RegistrarUsuarioComponent implements OnInit{

  // Esto será usado en el dropdown de ubicación
  provincias: string[] = [];
  departamentos: string[] = [];
  tocado: boolean = false;

  formularioRegister: FormGroup;


  constructor(
    private registerFormService: RegisterFormService, 
    private userService: UserService, 
    private router: Router,
    private ubicacionApiService: UbicacionApiService,
  ){
    // Creo el formulario a usar para el registro
    this.formularioRegister = registerFormService.createRegisterForm();
  }

  ngOnInit(): void {
  this.cargarProvincias();
  this.desabilitarSelectMunicipio()
  }

  onSubmit(){
    // Convertir el valor de "tieneWhatsapp" a booleano (true o false)
    if (this.formularioRegister.value.tieneWhatsapp === "true") {
      this.formularioRegister.value.tieneWhatsapp = true; 
    } else if(this.formularioRegister.value.tieneWhatsapp === "false"){
      this.formularioRegister.value.tieneWhatsapp = false; 
    }

    this.userService.registerUsuario(this.formularioRegister.value) // Le pasamos los VALORES del formulario necesarios para el registro
    .then(response => {
      // En caso de que el registro sea exitoso, redirije al login
      this.router.navigate(["/login"])
      
      // Acá irá el servicio con Firebase Storage que agregará los campos que quedan de UsuarioRegisterDto
      
    })
    .catch(error => console.log(error))
  }


  cargarProvincias(): void{
    this.ubicacionApiService.getProvincias().subscribe((data: string[]) =>{
      this.provincias = data
    })
  }

  cargarDepartamentos(provincia: string){
    this.ubicacionApiService.getDepartamentos(provincia).subscribe(data => this.departamentos = data
    )
  }

  desabilitarSelectMunicipio(){
    // Escuchar cambios en el campo de provincia
    this.formularioRegister.get('provincia')?.valueChanges.subscribe(() => {
      const provinciaControl = this.formularioRegister.get('provincia');
      
      if (provinciaControl?.dirty && provinciaControl.value) {
        // Habilitar el campo de departamento si la provincia fue modificada y tiene un valor
        this.formularioRegister.get('departamento')?.enable();
        this.cargarDepartamentos(provinciaControl.value);
        this.tocado = true;
      } else {
        // Deshabilitar el campo de departamento si no se ha seleccionado una provincia
        this.formularioRegister.get('departamento')?.disable();
      }
    });

    // Inicialmente deshabilitar el campo de departamento
    this.formularioRegister.get('departamento')?.disable();
  }

}
