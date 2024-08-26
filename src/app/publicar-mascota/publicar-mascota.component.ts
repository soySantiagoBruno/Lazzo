import { Component } from '@angular/core';
import { FooterDarkComponent } from "../footer-dark/footer-dark.component";
import { NavbarUsuarioComponent } from "../navbar-usuario/navbar-usuario.component";

@Component({
  selector: 'app-publicar-mascota',
  standalone: true,
  imports: [FooterDarkComponent, NavbarUsuarioComponent],
  templateUrl: './publicar-mascota.component.html',
  styleUrl: './publicar-mascota.component.css'
})
export class PublicarMascotaComponent {

}
