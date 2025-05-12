import { Routes } from '@angular/router';
import { HomeComponent, AboutComponent } from './routes';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'sobre', component: AboutComponent },
  { path: '**', redirectTo: 'home' }
];
