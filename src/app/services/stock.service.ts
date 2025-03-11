import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private baseUrl = 'http://localhost:8080/stocks'; // Replace with actual backend URL

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });
  }

  // ✅ Get all stock symbols
  getSymbols(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`, { headers: this.getAuthHeaders() });
  }

  // ✅ Search stock by symbol
  searchSymbols(query: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${query}`, { headers: this.getAuthHeaders() });
  }

  // ✅ Add stock to the list
  addSymbol(symbol: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add-symbol`, symbol, { headers: this.getAuthHeaders() });
  }
}
