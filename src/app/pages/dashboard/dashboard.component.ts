import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searchForm: FormGroup = new FormGroup({}); // ✅ Initialize searchForm to avoid TypeScript error
  selectedTab: string = 'Symbols List'; // ✅ Default tab

  // ✅ Define sample data for positions
  positions = [
    { stock: 'AAPL', quantity: 10, avgPrice: 150, currentPrice: 155, profitLoss: 50 },
    { stock: 'TSLA', quantity: 5, avgPrice: 700, currentPrice: 680, profitLoss: -100 },
  ];

  // ✅ Define sample data for holdings
  holdings = [
    { asset: 'AAPL', quantity: 20, value: 3000, change: 0.05 },
    { asset: 'MSFT', quantity: 15, value: 2500, change: -0.02 },
  ];

  // ✅ Define sample data for symbols (Stocks List)
  symbols = [
    { name: 'AAPL', open: 150, high: 155, low: 148, price: 152 },
    { name: 'TSLA', open: 700, high: 720, low: 690, price: 710 },
  ];

  constructor(private fb: FormBuilder) {} // ✅ Inject FormBuilder

  ngOnInit() {
    // ✅ Properly initialize searchForm in ngOnInit()
    this.searchForm = this.fb.group({
      stockSymbol: ['']
    });
  }

  // ✅ Function to switch tabs
  setTab(tabName: string) {
    this.selectedTab = tabName;
  }

  // ✅ Function for handling search (Mock implementation)
  onSearch() {
    console.log("Searching for:", this.searchForm.value.stockSymbol);
  }
}
