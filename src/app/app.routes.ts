import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SaberMasComponent } from './saber-mas/saber-mas.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PublicarMascotaComponent } from './publicar-mascota/publicar-mascota.component';
import { HomeUsuarioComponent } from './home-usuario/home-usuario.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'saber-mas', component: SaberMasComponent},
    {path: 'publicar-mascota', component: PublicarMascotaComponent},
    {path: 'home-usuario', component: HomeUsuarioComponent}, //home para adoptar

    {path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: '**', component: PageNotFoundComponent }
];
