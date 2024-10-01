import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Firestore, getDocs } from '@angular/fire/firestore';
import { collection, query, where } from "firebase/firestore";

import { log } from 'console';

@Component({
  selector: 'app-navbar-usuario',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar-usuario.component.html',
  styleUrl: './navbar-usuario.component.css'
})
export class NavbarUsuarioComponent implements OnInit{

  uidUserActual = this.auth.currentUser?.uid;

  provincia?: string;
  municipio?: string;
  nombre?: string;
  urlImagenPerfil?: string | null;

  constructor(
    private userService: UserService, 
    private router: Router,
    private auth: Auth, 
    private firestore: Firestore
    
  ){}

  ngOnInit(): void {
    this.getUsuario();
  }
  



  // FIJATE COMO  TRAER UN USUARIO -> imprimite el nombre y ubicación
  async getUsuario(){
    const userRef = collection(this.firestore, "usuarios");

    // Realizar la consulta en Firestore
    const q = query(userRef, where("uid", "==", this.uidUserActual));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      this.provincia = doc.data()['provincia']
      this.municipio = doc.data()['municipio']
      this.nombre = doc.data()['nombreCompleto']

    });

    // Si es un usuario logueado con google, aparte traeme la foto de perfil
    if(this.auth.currentUser){
      this.urlImagenPerfil = this.auth.currentUser.photoURL?.replace('s96-c', 's400-c');
    }
  }


  cerrarSesion(){
    this.userService.logout()
    .then((response) => {
      this.router.navigate(['/home']);
    })
    .catch(error => console.log(error))
  }

}
