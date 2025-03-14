import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private baseUrl = 'http://localhost:8080/stocks'; // Replace with actual backend URL
  private baseUrlStockList = 'http://localhost:8080/api/stocks'; 
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

    // ✅ Fetch user's stock list
    getUserStockList(userId: string): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrlStockList}/${userId}`, { headers: this.getAuthHeaders() });
    }

    // ✅ Add stock to user's stock list
  addStockToUser(stock: any): Observable<any> {
    return this.http.post(`${this.baseUrlStockList}`, stock, { headers: this.getAuthHeaders() });
  }

  // ✅ Remove stock from user's stock list
  removeStockFromUser(stockId: number): Observable<any> {
    return this.http.delete(`${this.baseUrlStockList}/${stockId}`, { headers: this.getAuthHeaders() });
  }
}
