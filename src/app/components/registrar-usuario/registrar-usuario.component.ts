import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { RegisterFormService } from '../../forms/register-form.service';

@Component({
  selector: 'app-registrar-usuario',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.css'
})
export class RegistrarUsuarioComponent {

  formularioRegister: FormGroup;


  constructor(
    private registerFormService: RegisterFormService, 
    private userService: UserService, 
    private router: Router
  ){
    // Creo el formulario a usar para el login
    this.formularioRegister = registerFormService.createRegisterForm();
  }

  onSubmit(){
    this.userService.register(this.formularioRegister.value) // Le pasamos los VALORES del formulario necesarios para el registro
    .then(response => {
      // En caso de que el registro sea exitoso, redirije al login
      this.router.navigate(["/login"])
      
      // Acá irá el servicio con Firebase Storage que agregará los campos que quedan de UsuarioRegisterDto
      
    })
    .catch(error => console.log(error))
  }

}
