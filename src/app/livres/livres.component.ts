import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgForOf, NgIf} from "@angular/common";
import { Router } from '@angular/router';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-livres',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './livres.component.html',
  styleUrl: './livres.component.css'
})
export class LivresComponent {

  books : any;
  imagePath = 'assets/images/images.jpeg';
  selectedBook: any;
  searchTerm: any;
  selectedCategory: any;
  selectedAvailability: any;
  selectedAuthor: any;

  categories : any;
  author :any;


  constructor(private http:HttpClient,private router: Router) {

  }

  ngOnInit() : void{
    this.http.get<any>("http://localhost:8080/service-livre/api/livre").subscribe(
      {
        next : (data) => {
          this.books=data;
        },
        error: (err)=>{
          console.log(err);
        }
      }
    )

    this.http.get("http://localhost:8080/service-livre/api/categorie").subscribe(
      {
        next : (data) => {
          this.categories=data;
          console.log( this.categories)
        },
        error: (err)=>{
          console.log(err);
        }
      }
    )

  }

  viewDetails(book: any) {
    this.router.navigate(['/detailsLivre', book.id]).then(() => {
      // Code supplémentaire après la navigation (si nécessaire)
      console.log('Navigation réussie');
    }).catch((err) => {
      console.error('Erreur lors de la navigation:', err);
    });
  }


  onSearch() {

  }

  onCategoryChange() {

  }

  onAvailabilityChange() {

  }

  onAuthorChange() {

  }
}
