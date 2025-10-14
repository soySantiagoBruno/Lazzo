import { Component, Input } from '@angular/core';
import { Pet } from '../../../mocks/pets.mock';

@Component({
  selector: 'app-carta',
  standalone: true,
  imports: [],
  templateUrl: './carta.component.html',
  styleUrl: './carta.component.css'
})
export class CartaComponent {
  @Input() pet: any;

  // Helper para evitar llamar a encodeURIComponent desde la plantilla
    getWhatsappLink(pet: Pet): string {
        const phone = pet.contact?.whatsapp || pet.contact?.phone || '';
        const text = `Hola! quiero adoptar a ${pet.name}`;
        return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    }

}
