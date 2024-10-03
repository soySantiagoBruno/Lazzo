import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { getAuth } from 'firebase/auth';
import { EditarUsuarioFormService } from '../../forms/editar-usuario-form.service';
import { UserService } from '../../services/user.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { UbicacionApiService } from '../../services/ubicacion-api.service';
import { Auth, user } from '@angular/fire/auth';
import { log } from 'console';
import { UsuarioRegisterDto } from '../../models/usuario-register-dto';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, RouterLink],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.css'
})
export class EditarPerfilComponent implements OnInit{

  usuarioActual?: UsuarioRegisterDto|null;

  formularioEditarUsuario: FormGroup;

   // Esto será usado en el dropdown de ubicación
   provincias: string[] = [];
   municipios: string[] = [];

  constructor(
    private editarUsuarioFormService: EditarUsuarioFormService,
    private userService: UserService,
    private router: Router,
    private ubicacionApiService: UbicacionApiService,
    private auth: Auth
  ){
    // Creo el formulario a usar para editar el usuario
    this.formularioEditarUsuario = editarUsuarioFormService.createEditarUsuarioForm();
  }



    async ngOnInit(): Promise<void> {
      this.cargarProvincias();

      // Cargo los municipios dinámicamente a medida que voy eligiendo una provincia
      this.formularioEditarUsuario.get('provincia')?.valueChanges.subscribe(() => {
        let provinciaElegida = this.formularioEditarUsuario.get('provincia');
        this.cargarMunicipios(provinciaElegida?.value);
      })


      //onAuthStateChanged: Este observador se asegura de que solo intentes obtener el uid y hacer la consulta en Firestore cuando Firebase haya cargado completamente el estado de autenticación del usuario.
      this.auth.onAuthStateChanged(async (user) => {

          this.usuarioActual = await this.userService.getUsuario()
          console.log(this.usuarioActual);

          this.formularioEditarUsuario.patchValue({
            nombreCompleto: this.usuarioActual?.nombreCompleto,
            email: this.usuarioActual?.email,
            celular: this.usuarioActual?.celular,
            provincia: this.usuarioActual?.provincia,
            municipio: this.usuarioActual?.municipio,
            tieneWhatsapp: this.usuarioActual?.tieneWhatsapp
          });
      }) 
      
     

    }


  // aca usar nuevo metodo editarUsuario()
    onSubmit(){
      this.userService.actualizarUsuario(this.formularioEditarUsuario.value) // Le pasamos los VALORES del formulario necesarios para el registro
      .then(response => {
        // En caso de que el registro sea exitoso, redirije al login      
        this.router.navigate(["/home-usuario"])
        console.log("actualizado con exito");
        
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



}
