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
  imports: [InfoMascotaComponent, NgIf, NgFor, NgStyle, CartaComponent],
})
export class CarruselComponent implements OnInit {
  AUTO_OPEN_MODAL: any = true;
  constructor(private modalService: NgbModal,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  pets: Pet[] = [];


  ngOnInit(): void {
    this.pets = PETS;
    /* esto despues borrarlo */
    if (isPlatformBrowser(this.platformId)) {
      // solo se ejecuta en el navegador
      this.abrirModal(this.pets[0]);
    }
  }

  ngAfterViewInit(){
    
  }

  // Helper para evitar llamar a encodeURIComponent desde la plantilla
  getWhatsappLink(pet: Pet): string {
    const phone = pet.contact?.whatsapp || pet.contact?.phone || '';
    const text = `Hola! quiero adoptar a ${pet.name}`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  }

  abrirModal(pet: any) {

    const modalRef = this.modalService.open(CartaComponent, {
      size: 'lg',
      scrollable: true,
      windowClass: 'modal-sin-margen' 
    });
    modalRef.componentInstance.pet = pet;
  }

  cerrarModal() {
    this.modalService.dismissAll();
  }


}
