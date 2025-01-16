import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DatePipe, NgIf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthServiceService} from "../auth-service.service";

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    DatePipe
  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent implements OnInit{

  reservationForm: FormGroup;
  showConfirmModal = false;
  isLoading = false;
  reservationSuccess = false;
  selectedBook: any;
  availableDate: any ;
  idPersonne! : String;

  bookId !: string | null;
  constructor(private fb: FormBuilder,private http :HttpClient ,private route: ActivatedRoute,
              private  auth :AuthServiceService) {
    this.reservationForm = this.fb.group({
      days: ['', [Validators.required, Validators.min(1), Validators.max(30)]]
    });
  }

  ngOnInit(): void {

    this.bookId = this.route.snapshot.paramMap.get('id');
    console.log("Shared :" +this.auth.idPersonne);
    this.idPersonne = this.auth.idPersonne;
    console.log(this.idPersonne);

    this.reservationForm.get('days')?.valueChanges.subscribe(days => {
      this.updateAvailableDate(days);
    });

    this.http.get("http://localhost:8080/service-livre/api/livre/"+this.bookId).subscribe(
      {
        next : (data) => {
          this.selectedBook=data;
          console.log(this.selectedBook);
        },
        error: (err)=>{
          console.log(err);
        }
      }
    )


    this.http.get("http://localhost:8080/service-emprunt//api/emprunte/byDateRetourLivre/"+this.bookId).subscribe(
      {
        next : (data) => {
          this.availableDate=data;
          console.log(this.availableDate);
        },
        error: (err)=>{
          console.log(err);
        }
      }
    )

  }

  updateAvailableDate(days: number): void {
    const today = new Date();
    this.availableDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      this.showConfirmModal = true;
    }
  }

  confirmReservation() {
    this.isLoading = true;
    this.showConfirmModal = false;

    const reservation = {
      idLivre :  this.bookId ,
      idPersonne : this.idPersonne,
      dureeJours : this.reservationForm.value.days
    };

    this.http.post("http://localhost:8080/reservation-service/api/reservation",reservation).subscribe(
      {
        next : (data) => {
          this.availableDate=data;
          console.log(this.availableDate);
        },
        error: (err)=>{
          console.log(err);
        }
      }
    )
    // Simuler une requête API
    setTimeout(() => {
      this.isLoading = false;
      this.reservationSuccess = true;
    }, 1500);
  }

  closeModal() {
    this.showConfirmModal = false;
  }

}
