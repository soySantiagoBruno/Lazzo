import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, user } from '@angular/fire/auth';
import { addDoc, collection, Firestore, getDocs, query, where } from '@angular/fire/firestore';
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
    .then(async (userCredential) => {
      
      // Una vez logueados con Google, SI NO estamos registrados en la colección "usuarios" nos vamos al registro-usuario-google
      const uidUserActual = this.auth.currentUser?.uid;
      
      // Realizar la consulta en Firestore
      const q = query(collection(this.firestore, 'usuarios'), where("uid", "==", uidUserActual));
      const querySnapshot = await getDocs(q);

      // Verificar si el documento existe en Firestore
      if (!querySnapshot.empty) {
          console.log("El usuario existe en la colección 'usuarios'");
          this.router.navigate(['/home-usuario']);
          
      } else {
          console.log("El usuario no está registrado en la colección 'usuarios'");
          // Procedemos a mandarlo al formulario de registrar-usuario-google
          //Primero guardamos las credenciales en una variable para ser usado por registerUsuarioGoogle()
          this.userCredential = userCredential;
          
          this.router.navigate(['/registrar-usuario-google']);
          
      }

    
    })
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
  

  // Me traigo un usuario a partir del UID
  async getUsuario(): Promise<UsuarioRegisterDto>{
    let uidUserActual = this.auth.currentUser?.uid;
    const userRef = collection(this.firestore, "usuarios");

    const usuarioTraido: UsuarioRegisterDto = {
      nombreCompleto: '',
      celular: undefined,
      email: '',
      provincia: '',
      municipio: '',
      tieneWhatsapp: false,
      password: '',
      urlImagenPerfil:''
    };

    // Realizar la consulta en Firestore
    const q = query(userRef, where("uid", "==", uidUserActual));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      usuarioTraido.provincia = doc.data()['provincia']
      usuarioTraido.municipio = doc.data()['municipio']
      usuarioTraido.nombreCompleto = doc.data()['nombreCompleto']
      usuarioTraido.celular = doc.data()['celular']
      usuarioTraido.tieneWhatsapp = doc.data()['tieneWhatsapp']
      usuarioTraido.email = doc.data()['email']
      usuarioTraido.mascotasEnAdopcion = doc.data()['mascotasEnAdopcion']

    });

    // Si es un usuario logueado con google, aparte traeme la foto de perfil
    if(this.auth.currentUser){
      usuarioTraido.urlImagenPerfil = this.auth.currentUser.photoURL?.replace('s96-c', 's400-c');
    }

    return usuarioTraido;
  }

  logout(){
    return signOut(this.auth);
  }

}
