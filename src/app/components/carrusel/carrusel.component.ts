import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { InfoMascotaComponent } from '../info-mascota/info-mascota.component';
import { isPlatformBrowser, NgFor, NgIf, NgStyle } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartaComponent } from './carta/carta.component';
import { Pet, PETS } from '../../mocks/pets.mock';

@Component({
  selector: 'app-carrusel',
  standalone: true,
  templateUrl: './carrusel.component.html',
  styleUrl: './carrusel.component.css',
  imports: [NgFor],
})
export class CarruselComponent implements OnInit {

  constructor(private modalService: NgbModal){}

  pets: Pet[] = [];


  ngOnInit(): void {
    this.pets = PETS;
  }

  // Helper para evitar llamar a encodeURIComponent desde la plantilla
  getWhatsappLink(pet: Pet): string {
    const phone = pet.contact?.whatsapp || pet.contact?.phone || '';
    const text = `Hola! quiero adoptar a ${pet.name}`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  }

  abrirModal(pet: any) {

    /* crea un modal con la estructura: .modal -> .modal-dialog -> .modal-content */
    const modalRef = this.modalService.open(CartaComponent, {
      
      /* esto agrega clases  al div de .modal*/
      windowClass: 'modal-xl d-flex justify-content-center ', /* en escritorio, el modal es large */

      /* esto agregar clases al div de .modal-dialog */
      modalDialogClass: 'modal-fullscreen-xl-down m-0' /* en mobile el modal es de pantalla completa */
    });
    modalRef.componentInstance.pet = pet;
  }

  cerrarModal() {
    this.modalService.dismissAll();
  }


}
