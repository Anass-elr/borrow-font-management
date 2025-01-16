import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {AuthServiceService} from "../auth-service.service";


interface Emprunte {
  idPersonne           : String;
  idLivre      : String;
  dateEmprunte  : Date;
  retourLivre   : Date;
}


@Component({
  selector: 'app-emprunt-livre',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    DatePipe
  ],
  templateUrl: './emprunt-livre.component.html',
  styleUrl: './emprunt-livre.component.css'
})
export class EmpruntLivreComponent {


  bookId: any ;
  book:  any ;
  borrowForm: FormGroup;
  imagePath = 'assets/images/images.jpeg';
  empruntResponse:any;

  showConfirmModal = false;
  isLoading = false;
  showSuccessModal = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http : HttpClient,
    private auth:AuthServiceService
  ) {
    this.borrowForm = this.fb.group({
      dateEmprunt: ['', Validators.required],
      dateRetour: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.bookId = this.route.snapshot.paramMap.get('id');
    console.log(this.bookId)
    // In a real application, you would fetch the book details from a service
    this.http.get("http://localhost:8080/service-livre/api/livre/"+this.bookId).subscribe(
      {
        next : (data) => {
          this.book=data;
          console.log(this.book);
        },
        error: (err)=>{
          console.log(err);
        }
      }
    );
  }

  onSubmit() {
    if (this.borrowForm.valid) {
      console.log('Form submitted', this.borrowForm.value);
      this.showConfirmModal = true;
      // Implement borrow logic here
    }
  }

  confirmBorrow() {
    this.showConfirmModal = false;
    this.isLoading = true;

    const newEmprunte: Emprunte = {
      idPersonne   : this.auth.idPersonne,
      idLivre      : this.book.id,
      dateEmprunte : new Date(this.borrowForm.value.dateEmprunt),
      retourLivre  : new Date(this.borrowForm.value.dateRetour)
    };

    console.log(newEmprunte);
    this.http.post("http://localhost:8080/service-emprunt/api/emprunte",newEmprunte).subscribe(
      {
        next: (data) => {
          this.empruntResponse = data;
          console.log(this.empruntResponse);
        },
        error: (err) => {
          console.log(err);
        }
      }
    );

    // Simulate API call with 2 second delay
    setTimeout(() => {
      this.isLoading = false;
      this.showSuccessModal = true;

    }, 2000);
  }

    closeSuccessModal() {
      this.showSuccessModal = false;
      // Here you could navigate back to the book list
    }

}
