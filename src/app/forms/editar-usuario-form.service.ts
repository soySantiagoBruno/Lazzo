import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EditarUsuarioFormService {

  createEditarUsuarioForm(): FormGroup {
    return new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      nombreCompleto: new FormControl('', [Validators.required]),
      celular: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$'), // validación para un número de 10 dígitos
      ] ),
      provincia: new FormControl('', [Validators.required]),
      municipio: new FormControl('', [Validators.required]),
      tieneWhatsapp: new FormControl('', [Validators.required]),

    });
  }


}
