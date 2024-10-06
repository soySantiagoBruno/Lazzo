import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editar-password.component.html',
  styleUrl: './editar-password.component.css'
})
export class EditarPasswordComponent {

  formularioEditarPassword: FormGroup;

  constructor(){
    this.formularioEditarPassword = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })
  }


  onSubmit(){
    console.log("enviando formulario...");
    
  }

}
