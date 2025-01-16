import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NgForOf, NgIf} from "@angular/common";




@Component({
  selector: 'app-details-livre',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './details-livre.component.html',
  styleUrl: './details-livre.component.css'
})
export class DetailsLivreComponent {


  bookId !: string | null;
  book : any;
  imagePath = 'assets/images/images.jpeg';
  selectedBook: any;
  constructor(private route: ActivatedRoute,
              private http:HttpClient
              ,private router: Router) {}

  ngOnInit() {
    this.bookId = this.route.snapshot.paramMap.get('id');
    console.log(this.bookId);
    // Ici tu peux utiliser l'ID pour récupérer les détails du livre
    this.http.get("http://localhost:8080/service-livre/api/livre/"+this.bookId).subscribe(
      {
        next : (data) => {
          this.book=data;
          console.log(this.book)
        },
        error: (err)=>{
          console.log(err);
        }
      }
    )
  }

  reserveBook() {
    if (this.book && this.book.id) {
      this.router.navigate(['/reservation', this.book.id])
        .then(() => {
          console.log('Navigation réussie');
        })
        .catch((err) => {
          console.error('Erreur lors de la navigation:', err);
        });
    } else {
      console.error('Book or Book ID is undefined');
    }
  }

  borrowBook() {

    if (this.book && this.book.id) {
      this.router.navigate(['/emprunt', this.book.id])
        .then(() => {
          console.log('Navigation réussie');
        })
        .catch((err) => {
          console.error('Erreur lors de la navigation:', err);
        });
    } else {
      console.error('Book or Book ID is undefined');
    }
  }


}
