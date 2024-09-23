import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SaberMasComponent } from './components/saber-mas/saber-mas.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PublicarMascotaComponent } from './components/publicar-mascota/publicar-mascota.component';
import { HomeUsuarioComponent } from './components/home-usuario/home-usuario.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { AuthGuard, canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RegistrarUsuarioGoogleComponent } from './components/registrar-usuario-google/registrar-usuario-google.component';


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
        canActivate: [AuthGuard],
        data: { authGuardPipe: redirectLoggedInToHomeUsuario },
    },
    {path: 'registrar-usuario', component: RegistrarUsuarioComponent},
    {path: 'registrar-usuario-google', component: RegistrarUsuarioGoogleComponent},
    
    // Secciones protegidas
    {path: 'home-usuario', 
        component: HomeUsuarioComponent,
        canActivate:[AuthGuard],
        // Usamos la tubería para redirigir
        data: { authGuardPipe: redirectUnauthorizedToLogin },
    }, //home para adoptar (necesitas estar logueado)
    {
        path: 'publicar-mascota',
        component: PublicarMascotaComponent,
        canActivate:[AuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
    },
    
    // Redirecciones y página 404
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: '**', component: PageNotFoundComponent }
];
