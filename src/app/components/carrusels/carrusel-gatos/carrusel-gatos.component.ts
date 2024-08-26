import { Component } from '@angular/core';
import { CartaComponent } from "../../carta/carta.component";

@Component({
    selector: 'app-carrusel-gatos',
    standalone: true,
    templateUrl: './carrusel-gatos.component.html',
    styleUrl: './carrusel-gatos.component.css',
    imports: [CartaComponent]
})
export class CarruselGatosComponent {

}
