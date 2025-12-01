// src/app/components/recent-searches/recent-searches.component.ts

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonList, IonItem, PopoverController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-recent-searches',
  // El HTML del popover
  template: `
    <ion-list>
      <ion-item 
        *ngFor="let search of searches" 
        (click)="selectSearch(search)" 
        button 
        [detail]="false">
        {{ search }}
      </ion-item>
    </ion-list>
  `,
  standalone: true, // <-- Es standalone
  imports: [
    CommonModule, // <-- Importa lo que necesita (ngFor)
    IonList, 
    IonItem
  ],
})
export class RecentSearchesComponent {
  
  @Input() searches: string[] = [];

  constructor(private popoverController: PopoverController) {}

  // Cuando se selecciona, cierra el popover y devuelve el texto
  selectSearch(search: string) {
    this.popoverController.dismiss(search);
  }
}