import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { RegisterFormService } from '../../forms/register-form.service';
import { UbicacionApiService } from '../../services/ubicacion-api.service';

@Component({
  selector: 'app-registrar-usuario',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.css'
})
export class RegistrarUsuarioComponent{

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

  onSubmit(){
    // Convertir el valor de "tieneWhatsapp" a booleano (true o false)
    if (this.formularioRegister.value.tieneWhatsapp === "true") {
      this.formularioRegister.value.tieneWhatsapp = true; 
    } else{
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

  mostrarProvincias(){
    this.ubicacionApiService.getProvincias().subscribe((data: any) => console.log(data)
    )
  }


  mostrarMunicipios(){
    this.ubicacionApiService.getMunicipios().subscribe(data => console.log(data)
    )
  }

}
