import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegisterFormService {
  
  createRegisterForm(): FormGroup {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      nombreCompleto: new FormControl('', [Validators.required]),
      celular: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$'), // validación para un número de 10 dígitos
      ] ),
      provincia: new FormControl('', [Validators.required]),
      departamento: new FormControl('', [Validators.required]),
      tieneWhatsapp: new FormControl('', [Validators.required]),

    });
  }
}
