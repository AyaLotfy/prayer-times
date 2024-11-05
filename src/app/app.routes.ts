import { Routes } from '@angular/router';
import { PrayerTimesComponent } from './components/prayer-times/prayer-times.component';

export const routes: Routes = [
//     { path: '', redirectTo: '/home', pathMatch: 'full' },  // Optional home route
{ path: '', component: PrayerTimesComponent },

{ path: 'prayer-times', component: PrayerTimesComponent },
//   { path: '**', redirectTo: '/home' }  // Optional wildcard route for unknown paths
];
