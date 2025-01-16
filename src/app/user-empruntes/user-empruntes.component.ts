import { Component } from '@angular/core';
import {CurrencyPipe, DatePipe, NgForOf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {interval, Subscription} from "rxjs";
import {AuthServiceService} from "../auth-service.service";



@Component({
  selector: 'app-user-empruntes',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './user-empruntes.component.html',
  styleUrl: './user-empruntes.component.css'
})
export class UserEmpruntesComponent {

  constructor(private http :HttpClient,private auth:AuthServiceService) { }


  borrowedBooks: any;
  imagePath = 'assets/images/images.jpeg';

  idPersonne     :     any =this.auth.idPersonne ;


  private timerSubscription!: Subscription;


  ngOnInit(): void {
    this.http.get("http://localhost:8080/service-emprunt/api/emprunte/byUser/"+this.idPersonne).subscribe(
     {
       next : (data) => {
         this.borrowedBooks=data;
         console.log(this.borrowedBooks);
       },
       error: (err)=>{
         console.log(err);
       }
     }
   )

    this.timerSubscription = interval(60000).subscribe(() => {
      this.borrowedBooks = [...this.borrowedBooks];
    });

  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  isOverdue(returnDate: Date): boolean {
    return new Date() > returnDate;
  }

  getCountdown(returnDateString: string): string {
    const returnDate = new Date(returnDateString); // Convertir la chaîne en Date

    const now = new Date();
    const timeDiff = returnDate.getTime() - now.getTime();

    if (timeDiff <= 0) {
      return 'Temps écoulé';
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return `${days}j ${hours}h ${minutes}m ${seconds}s`;
  }

}
