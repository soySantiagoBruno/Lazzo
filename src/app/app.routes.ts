import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SaberMasComponent } from './components/saber-mas/saber-mas.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PublicarMascotaComponent } from './components/publicar-mascota/publicar-mascota.component';
import { HomeUsuarioComponent } from './components/home-usuario/home-usuario.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import {canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RegistrarUsuarioGoogleComponent } from './components/registrar-usuario-google/registrar-usuario-google.component';
import { MyGuard } from './guards/my-guard';
import { LoginGuard } from './guards/login-guard';


// Tuberías para redirigir
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHomeUsuario = () => redirectLoggedInTo(['home-usuario']);

export const routes: Routes = [
    
    // Secciones públicas
    {path: 'home', component: HomeComponent},
    {path: 'saber-mas', component: SaberMasComponent},
    
    // Secciones de logueo y registro
    {path: 'login', 
        component: LoginComponent,
        // Si ya estas logueado, mandalo al home-usuario
        //canActivate: [LoginGuard], //SEGUIR DESARROLLANDO ESTO
        //data: { authGuardPipe: redirectLoggedInToHomeUsuario },
    },
    {path: 'registrar-usuario', component: RegistrarUsuarioComponent},
    {path: 'registrar-usuario-google', component: RegistrarUsuarioGoogleComponent},
    
    // Secciones protegidas
    {path: 'home-usuario', 
        component: HomeUsuarioComponent,
        canActivate:[MyGuard],
    }, //home para adoptar (necesitas estar logueado)
    {
        path: 'publicar-mascota',
        component: PublicarMascotaComponent,
        canActivate:[MyGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
    },
    
    // Redirecciones y página 404
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: '**', component: PageNotFoundComponent }
];
