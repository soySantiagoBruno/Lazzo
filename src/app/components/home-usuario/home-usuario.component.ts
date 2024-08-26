import { Component } from '@angular/core';
import { NavbarUsuarioComponent } from "../navbars/navbar-usuario/navbar-usuario.component";
import { CarruselGatosComponent } from '../carrusels/carrusel-gatos/carrusel-gatos.component';
import { CarruselPerrosComponent } from '../carrusels/carrusel-perros/carrusel-perros.component';
import { FooterComponent } from "../footers/footer/footer.component";
import { FiltroComponent } from "../filtro/filtro.component";
import { FooterDarkComponent } from "../footers/footer-dark/footer-dark.component";

@Component({
    selector: 'app-home-usuario',
    standalone: true,
    templateUrl: './home-usuario.component.html',
    styleUrl: './home-usuario.component.css',
    imports: [NavbarUsuarioComponent, CarruselGatosComponent, CarruselPerrosComponent, FooterComponent, FiltroComponent, FooterDarkComponent]
})
export class HomeUsuarioComponent {

}
