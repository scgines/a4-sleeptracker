// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';
// import { HomePage} from './pages/home/home.page';
// import { MenuPage } from './pages/menu/menu.page';

// export const routes: Routes = [
//   {
//     path: 'home',
//     loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
//   },
//   {
//     path: '',
//     redirectTo: 'home',
//     pathMatch: 'full',
//   },
//   {
//     path: 'menu',
//     loadComponent: () => import('./pages/menu/menu.page').then( m => m.MenuPage)
//   },

// ];

// @NgModule({
//   imports: [
//   RouterModule.forRoot([
//     { path: '', component: MenuPage },
//     { path: 'home', component: HomePage },
//   ])
//   ],
// })
// export class AppRoute { }


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage} from './pages/home/home.page';
import { MenuPage } from './pages/menu/menu.page';

export const routes: Routes = [
  { path: '', component: MenuPage},
  { path: 'home', component: HomePage},
  { path: 'menu', component: MenuPage},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoute { }