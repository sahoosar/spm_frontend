import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  searchForm: FormGroup;
  stock: any; // or define a Stock interface for strong typing

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.searchForm = this.fb.group({
      stockSymbol: ['']
    });
  }

  onSearch() {
    // Get the symbol from the form
    const symbol = this.searchForm.value.stockSymbol.trim();

    if (!symbol) {
      alert('Please enter a stock symbol.');
      return;
    }

    const url = `http://192.168.0.70:8080/stocks/${symbol}`;
    const token = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }); 
    this.http.get(url,{headers}).subscribe({
      next: (data) => {
        this.stock = data;
        console.log('Stock data received:', data);
      },
      error: (err) => {
        console.error('Error fetching stock data:', err);
        alert('Failed to fetch stock data. Check console for details.');
      }
    });
  }
}
