import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, user } from '@angular/fire/auth';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { UsuarioRegisterDto } from '../models/usuario-register-dto';
import { Router, RouterLink } from '@angular/router';
import { UsuarioRegisterGoogleDto } from '../models/usuario-register-google-dto';
import { UsuarioLogin } from '../models/usuario-login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth: Auth, private firestore: Firestore, private router: Router) { }

  // Registrar usando authentication y storage (clásico) (pide todos los datos de una)
  registerUsuario(usuario: UsuarioRegisterDto) {
    const userRef = collection(this.firestore, 'usuarios');
    
    // Crear el usuario en Firebase Authentication sin usar Google
    return createUserWithEmailAndPassword(this.auth, usuario.email, usuario.password)
      .then((userCredential) => {
        // Agregar los datos adicionales a Firestore a la colección "usuarios"
        return addDoc(userRef, {
          uid: userCredential.user.uid, // Asociar los datos al UID del usuario
          nombreCompleto: usuario.nombreCompleto,
          celular: usuario.celular,
          email: usuario.email,
          provincia: usuario.provincia,
          municipio: usuario.municipio,
          tieneWhatsapp: usuario.tieneWhatsapp,
          mascotasEnAdopcion: usuario.mascotasEnAdopcion || [] // Si no se especifican mascotas, guardar un array vacío
        });
      })
      .catch((error) => {
        console.error("Error al registrar el usuario:", error);
        throw error; // Propagar el error para que pueda ser manejado por quien llama a esta función
      });
  }

  login({email, password}: UsuarioLogin){
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  userCredential: any;
  // Crear usuario con google ó iniciar sesión si ya existe
  loginWithGoogle(){
    const userRef = collection(this.firestore, 'usuarios');

    // Popup Google
    return signInWithPopup(this.auth, new GoogleAuthProvider())
    .then((userCredential) => {
      
      // Una vez logueados con Google, SI NO estamos registrados nos vamos al registro-usuario-google
      //Primero guardamos las credenciales en una variable para ser usado por registerUsuarioGoogle()
      this.userCredential = userCredential;
      //console.log(userCredential);
      
      this.router.navigate(['/registrar-usuario-google']);

      /* // Agregar los datos adicionales a Firestore a la colección "usuarios"
      return addDoc(userRef, {
        uid: userCredential.user.uid, // Asociar los datos al UID del usuario
        nombreCompleto: usuario.nombreCompleto,
        celular: usuario.celular,    
        provincia: usuario.provincia,
        municipio: usuario.municipio,
        tieneWhatsapp: usuario.tieneWhatsapp,
        mascotasEnAdopcion: usuario.mascotasEnAdopcion || [] // Si no se especifican mascotas, guardar un array vacío 
      });*/
    })


    /* .catch((error) => {
      console.error("Error al registrar el usuario:", error);
      throw error; // Propagar el error para que pueda ser manejado por quien llama a esta función
    }); */
  }


  // Función que termina de armar el registro de un usuario registrado mediante Google
  // loginWithGoogle() -> después usamos registerUsuarioGoogle() en /registrar-usuario-google
  registerUsuarioGoogle(usuario: any) {
    // Coleccion usuario en Firestore
    const userRef = collection(this.firestore, 'usuarios');
    
    // Crear el usuario en Firebase Authentication usando Google
    // NO NECESITAMOS agregarlo al Authentication solo al Firebase Database
    // Agregar los datos adicionales a Firestore a la colección "usuarios"
    //console.log(`uid cargado con el popup ${this.userCredential.user.uid}`);
    //console.log(`email cargado con el popup ${this.userCredential.user.email}`);
    
    return addDoc(userRef, {
      // Datos traidos del Popup de Google
      uid: this.userCredential.user.uid, // Asociar los datos al UID del usuario
      email: this.userCredential.user.email , // el email va a ser el que le pasa google
      
      // Datos traidos del /registrar-usuario-google
      nombreCompleto: usuario.nombreCompleto,
      celular: usuario.celular,
      provincia: usuario.provincia,
      municipio: usuario.municipio,
      tieneWhatsapp: usuario.tieneWhatsapp,
      mascotasEnAdopcion: usuario.mascotasEnAdopcion || [] // Si no se especifican mascotas, guardar un array vacío
    });
      
  }
  

  logout(){
    return signOut(this.auth);
  }

}
