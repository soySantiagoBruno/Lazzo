import { Component } from '@angular/core';
import { NavbarUsuarioComponent } from "../navbars/navbar-usuario/navbar-usuario.component";
import { FooterComponent } from "../footers/footer/footer.component";
import { FiltroComponent } from "../filtro/filtro.component";
import { FooterDarkComponent } from "../footers/footer-dark/footer-dark.component";

@Component({
    selector: 'app-home-usuario',
    standalone: true,
    templateUrl: './home-usuario.component.html',
    styleUrl: './home-usuario.component.css',
    imports: [NavbarUsuarioComponent, FooterComponent, FiltroComponent, FooterDarkComponent]
})
export class HomeUsuarioComponent {

}
