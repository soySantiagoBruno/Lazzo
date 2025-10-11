import { Component, OnInit } from '@angular/core';
import { InfoMascotaComponent } from "../../info-mascota/info-mascota.component";
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { CartaComponent } from "../../carta/carta.component";
import { Pet, PETS } from '../../../mocks/pets.mock';

@Component({
    selector: 'app-carrusel',
    standalone: true,
    templateUrl: './carrusel.component.html',
    styleUrl: './carrusel.component.css',
    imports: [InfoMascotaComponent, NgIf, NgFor, NgStyle, CartaComponent]
})
export class CarruselComponent implements OnInit {

    pets: Pet[] = [];
    // ...existing code...

    ngOnInit(): void {
        this.pets = PETS;
    }

    abrirModal(pet: Pet): void {
        console.log("modal abierto");
    }

    // Helper para evitar llamar a encodeURIComponent desde la plantilla
    getWhatsappLink(pet: Pet): string {
        const phone = pet.contact?.whatsapp || pet.contact?.phone || '';
        const text = `Hola! quiero adoptar a ${pet.name}`;
        return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    }

}
