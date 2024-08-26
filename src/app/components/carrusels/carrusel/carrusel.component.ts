import { Component, OnInit } from '@angular/core';
import { InfoMascotaComponent } from "../../info-mascota/info-mascota.component";
import { NgIf, NgStyle } from '@angular/common';
import { CartaComponent } from "../../carta/carta.component";

@Component({
    selector: 'app-carrusel',
    standalone: true,
    templateUrl: './carrusel.component.html',
    styleUrl: './carrusel.component.css',
    imports: [InfoMascotaComponent, NgIf, NgStyle, CartaComponent]
})
export class CarruselComponent {
  
}
