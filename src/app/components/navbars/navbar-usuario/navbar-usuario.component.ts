import { Component } from '@angular/core';

import { UserService } from '../../../services/user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-usuario',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar-usuario.component.html',
  styleUrl: './navbar-usuario.component.css'
})
export class NavbarUsuarioComponent {

  constructor(
    private userService: UserService, 
    private router: Router
  ){}

  cerrarSesion(){
    this.userService.logout()
    .then((response) => {
      this.router.navigate(['/home']);
    })
    .catch(error => console.log(error))
  }

}
