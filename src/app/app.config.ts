import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,
      //esto es para que el scrool se resetee y para redirigir a secciones específicas
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled'
      })
    ),
    provideHttpClient(withFetch()), 
    provideClientHydration(), 
    provideFirebaseApp(() => initializeApp({
      "projectId": "lazzo-ddb6b",
      "appId": "1:138962683932:web:02f1fafe85f7f8696b37d9",
      "storageBucket": "lazzo-ddb6b.appspot.com",
      "apiKey": "AIzaSyBwqQ5CgK5UgAAB1RgpjSNZ3FW9q1GRekI",
      "authDomain": "lazzo-ddb6b.firebaseapp.com",
      "messagingSenderId": "138962683932",
      "measurementId": "G-NE2JH2HTLF"
    })), 
    provideFirestore(() => getFirestore()), 
    provideAuth(() => getAuth())
  ]
};
