import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, user } from '@angular/fire/auth';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { UsuarioRegisterDto } from '../models/usuario-register-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth: Auth, private firestore: Firestore) { }

  // Usa authentication y storage
  registerUsuario(usuario: UsuarioRegisterDto) {
    const userRef = collection(this.firestore, 'usuarios');
    
    // Crear el usuario en Firebase Authentication
    return createUserWithEmailAndPassword(this.auth, usuario.email, usuario.password)
      .then((userCredential) => {
        // Agregar los datos adicionales a Firestore a la colección "usuarios"
        return addDoc(userRef, {
          uid: userCredential.user.uid, // Asociar los datos al UID del usuario
          nombreCompleto: usuario.nombreCompleto,
          celular: usuario.celular,
          email: usuario.email,
          ubicacion: usuario.ubicacion,
          tieneWhatsapp: usuario.tieneWhatsapp,
          mascotasEnAdopcion: usuario.mascotasEnAdopcion || [] // Si no se especifican mascotas, guardar un array vacío
        });
      })
      .catch((error) => {
        console.error("Error al registrar el usuario:", error);
        throw error; // Propagar el error para que pueda ser manejado por quien llama a esta función
      });
  }

  login({email, password}: any){
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  loginWithGoogle(){
    return signInWithPopup(this.auth, new GoogleAuthProvider())
  }

  logout(){
    return signOut(this.auth);
  }

  registrarUsuario(usuario: UsuarioRegisterDto){
    const userRef = collection(this.firestore, 'usuarios');
    return addDoc(userRef, usuario);
  }

}
