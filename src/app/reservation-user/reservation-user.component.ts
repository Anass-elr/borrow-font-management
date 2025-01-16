import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthServiceService} from "../auth-service.service";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-reservation-user',
  standalone: true,
  imports: [
    DatePipe,
    NgClass,
    NgIf,
    NgForOf
  ],
  templateUrl: './reservation-user.component.html',
  styleUrl: './reservation-user.component.css'
})

export class ReservationUserComponent implements OnInit {


  idPersonne! : String;
  reservations! : any;
  constructor(private http :HttpClient,private auth:AuthServiceService) {
  }

  ngOnInit(): void {
    this.idPersonne = this.auth.idPersonne;

    this.http.get("http://localhost:8080/reservation-service/api/reservation/"+this.idPersonne)
      .subscribe(
      {
        next : (data) => {
          this.reservations=data;
          console.log(this.reservations);

          this.reservations.forEach((reservation: { idLivre: any; livre: any; }) => {
            this.http.get("http://localhost:8080/service-livre/api/livre/"+reservation.idLivre).subscribe({
              next: (livreData: any) => {
                // Ajoutez le livre à la réservation
                reservation.livre = livreData;
                console.log('Reservation avec livre:', reservation);
              },
              error: (err) => {
                console.log('Erreur lors de la récupération du livre:', err);
              }
            });
          });
        },
        error: (err)=>{
          console.log(err);
        }
      }
    )
  }



}
