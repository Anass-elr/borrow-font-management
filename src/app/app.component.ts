import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterModule, RouterOutlet} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, RouterLink,RouterModule,
    FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'biblio-front-app';

  idPersonne     :     any = "c19e7114-77f6-45c6-a12e-bf4e5869ac43";

}
