import { Component } from '@angular/core';
import { CartaComponent } from "../../carta/carta.component";

@Component({
    selector: 'app-carrusel-perros',
    standalone: true,
    templateUrl: './carrusel-perros.component.html',
    styleUrl: './carrusel-perros.component.css',
    imports: [CartaComponent]
})
export class CarruselPerrosComponent {

}
