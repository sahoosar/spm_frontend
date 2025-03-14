
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface LoginPayload {
  userId: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
    // Update this URL to match your backend authentication endpoint.
    private authUrl = environment.apiEndpoints.login;

    constructor(private http: HttpClient) {}

    login(payload: LoginPayload): Observable<string> {
      return this.http.post(this.authUrl, payload, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        responseType: 'text' 
      }).pipe(
        map(response => {
          return response;
    }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
      let errorMessage = 'Unknown error!';
      if (error.error instanceof ErrorEvent) {
        // A client-side error occurred.
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // The backend returned an unsuccessful response code.
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.error(errorMessage);
      return throwError(() => new Error(errorMessage));
  }

  // Browser handling this , no need to store it in local storage.
  saveToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

 getToken(): string | null {
    return localStorage.getItem('access_token');
  }
}
