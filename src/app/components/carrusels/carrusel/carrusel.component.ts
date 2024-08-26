import { Component, OnInit } from '@angular/core';
import { InfoMascotaComponent } from "../../info-mascota/info-mascota.component";
import { NgIf, NgStyle } from '@angular/common';
import { SwitchService } from '../../../services/switch.service';
import { CartaComponent } from "../../carta/carta.component";

@Component({
    selector: 'app-carrusel',
    standalone: true,
    templateUrl: './carrusel.component.html',
    styleUrl: './carrusel.component.css',
    imports: [InfoMascotaComponent, NgIf, NgStyle, CartaComponent]
})
export class CarruselComponent implements OnInit{
  
  modalSwitch:boolean = false;


  constructor(private _switchService: SwitchService){

  }

  ngOnInit(): void {
    this._switchService.$modal.subscribe((valor:boolean)=>{this.modalSwitch=valor})
  }

  openModal(){
      this.modalSwitch=true;

      console.log("interruptor ejecutado!")
  }
}
