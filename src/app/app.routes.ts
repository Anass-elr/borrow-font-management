import { Routes } from '@angular/router';
import {LivresComponent} from "./livres/livres.component";
import {DetailsLivreComponent} from "./details-livre/details-livre.component";
import {EmpruntLivreComponent} from "./emprunt-livre/emprunt-livre.component";
import {UserEmpruntesComponent} from "./user-empruntes/user-empruntes.component";
import {AuthenticationPageComponent} from "./authentication-page/authentication-page.component";
import {ReservationComponent} from "./reservation/reservation.component";
import {ReservationUserComponent} from "./reservation-user/reservation-user.component";

export const routes: Routes = [
  {path : "livres" , component : LivresComponent},
  { path: 'detailsLivre/:id', component: DetailsLivreComponent },
  { path: 'emprunt/:id', component: EmpruntLivreComponent },
  { path: 'empruntUser', component: UserEmpruntesComponent },
  { path: 'authentication', component: AuthenticationPageComponent },
  { path: 'reservation/:id', component: ReservationComponent },
  { path: 'reservationUser', component: ReservationUserComponent }
];
