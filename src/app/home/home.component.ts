import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { CarruselComponent } from "../carrusel/carrusel.component";
import { InfoMascotaComponent } from "../info-mascota/info-mascota.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [FooterComponent, CarruselComponent, InfoMascotaComponent, NavbarComponent, RouterLink]
})
export class HomeComponent {

}