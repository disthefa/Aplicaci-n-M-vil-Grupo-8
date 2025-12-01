import { Component } from '@angular/core';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil-miski',
  templateUrl: './perfil-miski.page.html',
  styleUrls: ['./perfil-miski.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],  // ← Quitamos RouterLink
})
export class PerfilMiskiPage {
  notifEnabled = true;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  async verPerfil() {
    const toast = await this.toastController.create({
      message: 'Toca el icono de cámara para cambiar tu foto',
      duration: 2000,
      position: 'bottom',
      color: 'dark'
    });
    toast.present();
  }

  async editarDatos() {
    console.log('Navegando a editar datos...');
    const toast = await this.toastController.create({
      message: '✏️ Editando datos personales...',
      duration: 1500,
      position: 'bottom',
      color: 'dark'
    });
    toast.present();
  }

  async cambiarPassword() {
    console.log('Navegando a cambiar contraseña...');
    const toast = await this.toastController.create({
      message: '🔒 Abriendo cambio de contraseña...',
      duration: 1500,
      position: 'bottom',
      color: 'dark'
    });
    toast.present();
  }

  async configurarNotificaciones() {
    console.log('Estado notificaciones:', this.notifEnabled);
    const message = this.notifEnabled ? 
      '🔔 Notificaciones activadas' : 
      '🔕 Notificaciones desactivadas';
    
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom',
      color: 'dark'
    });
    toast.present();
  }

  async logout() {
    const alert = await this.alertController.create({
      header: '¿Cerrar sesión?',
      message: '¿Estás seguro de que deseas cerrar tu sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Cerrar Sesión',
          cssClass: 'danger',
          handler: async () => {
            const toast = await this.toastController.create({
              message: '👋 Cerrando sesión...',
              duration: 2000,
              position: 'bottom',
              color: 'danger'
            });
            toast.present();
            
            console.log('Sesión cerrada');
          }
        }
      ]
    });

    await alert.present();
  }
}