import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EditarPasswordFormService {

  createEditarPasswordForm(): FormGroup{
    return new FormGroup({
      currentPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),

      newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),

      repeteadedNewPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })
  }
}
