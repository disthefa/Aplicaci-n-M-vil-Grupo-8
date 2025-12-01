

import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';

import { 
  
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonButton,
  IonRippleEffect, 
  IonAvatar, 
  IonIcon,
  IonItem,
  IonInput,
  IonList,
  NavController           // <-- AÑADIDO
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- MUY IMPORTANTE (para *ngIf y *ngFor)
import { addIcons } from 'ionicons';
import { menuOutline, searchOutline } from 'ionicons/icons';

// 3. Ya NO importamos RecentSearchesComponent

@Component({
  selector: 'app-button',
  templateUrl: 'button.page.html',  // Cambiar 'Button.page.html' a 'button.page.html'
  styleUrls: ['button.page.scss'],   // Cambiar 'Button.page.scss' a 'button.page.scss'
  standalone: true,
  imports: [
    RouterLink,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonButton, 
    IonRippleEffect,
    IonAvatar, 
    IonIcon,
    FormsModule,
    CommonModule,     
    IonItem,          
    IonInput,
    IonList,
           // <-- AÑADIDO
    // 4. Quita RecentSearchesComponent de aquí
  ],
})

export class ButtonPage {
  


  searchQuery: string = '';
  recentSearches: string[] = ['Detergente', 'Lejia', 'Jabon en polvo', 'Suavizante'];

  // 5. NUEVA VARIABLE: para mostrar/ocultar la lista
  isRecentVisible: boolean = false;

  // 6. Quita PopoverController del constructor
  constructor(private navCtrl: NavController) {
    addIcons({ menuOutline, searchOutline });
  }




  // 7. NUEVA FUNCIÓN: para mostrar/ocultar la lista
  // Usamos event.stopPropagation() para evitar que el clic
  // en el contenido cierre la lista inmediatamente.
  toggleRecentSearches(event: Event) {
    event.stopPropagation();
    this.isRecentVisible = !this.isRecentVisible;
  }

  // 8. NUEVA FUNCIÓN: para seleccionar un item de la lista
  selectSearch(search: string) {
    this.searchQuery = search;
    this.isRecentVisible = false; // Oculta la lista
    this.performSearch(); // Opcional: buscar al seleccionar
  }
  
  // Tu lógica de búsqueda
  performSearch() {
    console.log('Buscando:', this.searchQuery);
    this.isRecentVisible = false; // Oculta la lista al buscar
    
    if (this.searchQuery && !this.recentSearches.includes(this.searchQuery)) {
      this.recentSearches.unshift(this.searchQuery);
      this.recentSearches = this.recentSearches.slice(0, 5);
    }
  }

  tuFuncion(){
    console.log("Boton presionado");
    this.isRecentVisible = false; // Oculta la lista si se presiona el avatar
  }

  // 9. NUEVA FUNCIÓN: para cerrar la lista si se hace clic en el contenido
  hideRecentSearches() {
    this.isRecentVisible = false;
  }

  iraInventario() {
    this.navCtrl.navigateForward('/inventario-miski');
    // O la ruta que tengas configurada para registro
  }



aPerfil() {
    this.navCtrl.navigateForward('/perfil-miski');
    // O la ruta que tengas configurada para registro
  }

iraReporte(){
   this.navCtrl.navigateForward('/reporte1');
    // O la ruta que tengas configurada para registro
  }

iraMovimientos() {
    this.navCtrl.navigateForward('/Movimientos-miski');
  }

}











