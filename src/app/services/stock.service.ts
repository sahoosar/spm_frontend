import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private baseUrl = environment.apiEndpoints.stockListBaseUrl // Replace with actual backend URL
  private baseUrlStockList = environment.apiEndpoints.stockListUsers; 
  private alphaVntgUrl = environment.apiEndpoints.alphaVntgUrl;


  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });
  }
  // Search stock by symbol
  searchSymbols(query: string): Observable<any> {
    return this.http.get<any>(`${this.alphaVntgUrl}/${query}`, { headers: this.getAuthHeaders() });
  }

  // Get all stock symbols
  getSymbols(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`, { headers: this.getAuthHeaders() });
  }


  // Add stock to the list
  addSymbol(symbol: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add-symbol`, symbol, { headers: this.getAuthHeaders() });
  }

    // Fetch user's stock list
    getUserStockList(userId: string): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrlStockList}/${userId}`, { headers: this.getAuthHeaders() });
    }

    // Add stock to user's stock list
    addStockToUser(stock: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, stock, { headers: this.getAuthHeaders() });
  } 

  // Remove stock from user's stock list
  removeStockFromUser(stockId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${stockId}`, { headers: this.getAuthHeaders() });
  }

  // get user holdings
  getUserHoldings(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiEndpoints.userHoldingsUri}${userId}`, { headers: this.getAuthHeaders() });
  }

  addStockToHoldings(stock: any): Observable<any> {
    return this.http.post(`${environment.apiEndpoints.portfolioUrl}`, stock, { headers: this.getAuthHeaders() });
  }
}
