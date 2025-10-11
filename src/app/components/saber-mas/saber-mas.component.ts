import { Component } from '@angular/core';
import { CarruselComponent } from '../carrusel/carrusel.component';
import { FooterComponent } from '../footers/footer/footer.component';
import { NavbarComponent } from '../navbars/navbar/navbar.component';


@Component({
    selector: 'app-saber-mas',
    standalone: true,
    templateUrl: './saber-mas.component.html',
    styleUrl: './saber-mas.component.css',
    imports: [FooterComponent, CarruselComponent, NavbarComponent]
})
export class SaberMasComponent {

}
