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
  // ✅ Function to switch tabs
  setTab(tabName: string) {
    this.selectedTab = tabName;
  }

  totalInvestment = 100000; // Example total investment amount
  overallProfit = 4500; // Example profit amount
  overallLoss = 0.05; // 5% loss



  //searchForm: FormGroup;
  showPopup = false;
  popupMessage = '';
  selectedSymbol: any = null;

// Example symbol data
symbolsForpopup = [
  { name: 'AAPL', price: 152 },
  { name: 'TSLA', price: 710 },
  { name: 'GOOGL', price: 2800 }
];
  
constructor(private fb: FormBuilder) {} // ✅ Inject FormBuilder


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

  ngOnInit() {
    // ✅ Properly initialize searchForm in ngOnInit()
    this.searchForm = this.fb.group({
      stockSymbol: ['']
    });
  }
  

  // ✅ Function for handling search (Mock implementation)
 // Search function
 onSearch() {
  const searchSymbol = this.searchForm.value.stockSymbol.trim().toUpperCase();
  
  if (!searchSymbol) {
    this.showPopup = true;
    this.popupMessage = 'Please enter a symbol to search.';
    this.selectedSymbol = null;
    return;
  }

  const foundSymbol = this.symbolsForpopup.find(s => s.name === searchSymbol);

    if (foundSymbol) {
      this.selectedSymbol = foundSymbol;
      this.popupMessage = ''; // Clear any previous message
    } else {
      this.selectedSymbol = null;
      this.popupMessage = `Symbol "${searchSymbol}" does not exist.`;
    }

    this.showPopup = true; // Show popup in both cases
  }

  // Close popup
  closePopup() {
    this.showPopup = false;
    this.selectedSymbol = null;
    this.popupMessage = '';
  }

  // Add symbol (mock function)
  addSymbol() {
    console.log(`Adding ${this.selectedSymbol?.name} to portfolio.`);
    this.closePopup();
  }

onBuy(symbol: any) {
    console.log("Buying:", symbol.name);
    // Add buy logic here
}

onSell(symbol: any) {
    console.log("Selling:", symbol.name);
    // Add sell logic here
}


onBuyPosition(position: any) {
  console.log("Buying more of:", position.stock);
  // Add your logic for increasing the position in the stock
}

onSellPosition(position: any) {
  console.log("Selling:", position.stock);
  // Add your logic for selling the stock position
}

onBuyHolding(holding:any){
  // Add your logic for increasing the position in the stock
}

onSellHolding(holding:any){
  // Add your logic for selling the stock position
}

}
