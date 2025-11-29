import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-filtro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.css'
})
export class FiltroComponent {

  ubicacion = new FormControl('');


aplicarFiltro() {
  console.log("Filtro aplicado!");

  /* const collapseEl = document.getElementById('collapseExample');
  const collapse = bootstrap.Collapse.getOrCreateInstance(collapseEl);
  collapse.hide(); */
}


}
