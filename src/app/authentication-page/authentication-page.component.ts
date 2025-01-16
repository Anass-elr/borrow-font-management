import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {HttpClient} from "@angular/common/http";

interface AuthRequest {
  grantType: string;
  refreshToken?: string;
  username: string;
  password: string;
  withRefreshToken: boolean;
}

export interface JwtResponse {
  accessToken: string;
  refreshToken?: string;  // Optional, because not all requests may include a refreshToken
}


@Component({
  selector: 'app-authentication-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './authentication-page.component.html',
  styleUrl: './authentication-page.component.css'
})



export class AuthenticationPageComponent {

  authForm: FormGroup;
  authRequest!: AuthRequest;  // Déclaration de la variable qui suit l'interface


  constructor(private fb: FormBuilder,private http:HttpClient) {
    this.authForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.authForm.valid) {
      console.log('Form submitted', this.authForm.value);
      // Implement authentication logic here

      this.authRequest = {
        grantType: 'password', // valeur par défaut pour grantType
        username: this.authForm.value.username,
        password: this.authForm.value.password,
        withRefreshToken: true,
      };


      this.http.post<JwtResponse>('http://localhost:9898/token', this.authRequest).subscribe(
        (response) => {
          console.log('Response:', response);
          const accessToken = response.accessToken;  // Now TypeScript knows accessToken exists
          const refreshToken = response?.refreshToken;  // refreshToken may be undefined if not provided
          console.log('Access Token:', accessToken);
          console.log('Refresh Token:', refreshToken);
          console.log(accessToken)
          localStorage.setItem('accessToken', accessToken);
          if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
          }
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  }


  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

}
