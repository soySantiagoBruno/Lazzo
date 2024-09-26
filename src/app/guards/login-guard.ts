import { inject } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { collection, Firestore, getDocs, query, where } from "@angular/fire/firestore";
import { Router } from "@angular/router";

export const LoginGuard = async () => {
  const authService = inject(Auth);
  const firestore = inject(Firestore);
  const router = inject(Router);

  // Obtener el uid del usuario actual
  const uidUserActual = authService.currentUser?.uid;

  // Si el usuario no está logueado, permitimos que acceda al login
  if (!uidUserActual) {
    return true; // Permitir acceso al login
  }

  // Realizar la consulta en Firestore
  const q = query(collection(firestore, 'usuarios'), where("uid", "==", uidUserActual));
  const querySnapshot = await getDocs(q);

  // Si el usuario ya está registrado en Firestore, redirigir a home-usuario
  if (!querySnapshot.empty) {
    router.navigate(['/home-usuario']); // Redirigir si el usuario ya está registrado
    return false; // No permitir acceso al login
  }

  // Si no está registrado en Firestore, permitimos que acceda al login
  return true; // Permitir acceso al login
};
