import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SaberMasComponent } from './components/saber-mas/saber-mas.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PublicarMascotaComponent } from './components/publicar-mascota/publicar-mascota.component';
import { HomeUsuarioComponent } from './components/home-usuario/home-usuario.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RegistrarUsuarioGoogleComponent } from './components/registrar-usuario-google/registrar-usuario-google.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},

    {path: 'home', component: HomeComponent},

    {path: 'saber-mas', component: SaberMasComponent},
    {path: 'publicar-mascota', component: PublicarMascotaComponent},
    {path: 'home-usuario', 
        component: HomeUsuarioComponent,
        ...canActivate(() => redirectUnauthorizedTo(['/login']))     
    }, //home para adoptar (necesitas estar logueado)
    {path: 'registrar-usuario', component: RegistrarUsuarioComponent},
    {path: 'registrar-usuario-google', component: RegistrarUsuarioGoogleComponent},

    {path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: '**', component: PageNotFoundComponent }
];
