import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'registro',
    loadComponent: () => import('./registro/registro.page').then(m => m.RegistroPage)
  },
  {
    path: 'button',
    loadComponent: () => import('./button/button.page').then((m) => m.ButtonPage),
  },
  {
    path: 'inventario-miski',
    loadComponent: () => import('./inventario-miski/inventario-miski.page').then(m => m.InventarioMiskiPage)
  },
  {
    path: 'perfil-miski',
    loadComponent: () => import('./perfil-miski/perfil-miski.page').then(m => m.PerfilMiskiPage)
  },
  {
    path: 'reporte1',
    loadComponent: () => import('./reporte1/reporte1.page').then((m) => m.Reporte1Page),
  },
  // --- AGREGAMOS ESTA RUTA NUEVA ---
  {
    path: 'movimientos-miski',
    loadComponent: () => import('./Movimientos-miski/movimientos').then(m => m.MovimientosPage)
  },
];
