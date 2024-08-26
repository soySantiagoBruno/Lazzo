import { Component, OnInit } from '@angular/core';
import { SwitchService } from '../../services/switch.service';
import { NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-info-mascota',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './info-mascota.component.html',
  styleUrl: './info-mascota.component.css'
})
export class InfoMascotaComponent implements OnInit{

  constructor(private _switchService: SwitchService){

  }

  ngOnInit(): void {
      
  }

  // Esta función va a usar el servicio para emitir un evento que CIERRA el modal (un false)
  closeModal(){
    this._switchService.$modal.emit(false);
  }

}
