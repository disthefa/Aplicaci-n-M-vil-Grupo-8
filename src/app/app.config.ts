import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

// Credenciales Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAQuhFjJDklDSLdlU649bPd1jsQU2c8rFI",
  authDomain: "miskyapp-58758.firebaseapp.com",
  projectId: "miskyapp-58758",
  storageBucket: "miskyapp-58758.firebasestorage.app",
  messagingSenderId: "575338572315",
  appId: "1:575338572315:web:fae68ecbe876c2298a6cbe",
  measurementId: "G-Z6PJVBFN7B"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideIonicAngular(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ]
};