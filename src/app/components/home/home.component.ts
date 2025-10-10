import { Component } from '@angular/core';
import { FooterComponent } from "../footers/footer/footer.component";
import { CarruselComponent } from "../carrusels/carrusel/carrusel.component";
import { InfoMascotaComponent } from "../info-mascota/info-mascota.component";
import { NavbarComponent } from "../navbars/navbar/navbar.component";
import { RouterLink } from '@angular/router';
import { FiltroComponent } from '../filtro/filtro.component';
import { AboutComponent } from "../about/about.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [FooterComponent, CarruselComponent, InfoMascotaComponent, FiltroComponent, NavbarComponent, RouterLink, AboutComponent, AboutComponent]
})
export class HomeComponent {

}