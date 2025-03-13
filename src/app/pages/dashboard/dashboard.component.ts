import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searchForm: FormGroup = new FormGroup({});
  tradeForm: FormGroup  = new FormGroup({});

  selectedTab: string = 'Symbols List'; // Default Tab

  showPopup = false;
  popupTitle = '';
  popupMessage = '';
  selectedSymbol: any = null;
  transactionType: 'search' | 'buy' | 'sell' | null = 'search';

  // Example stock data
  totalInvestment = 100000; // Example total investment amount
  overallProfit = 4500; // Example profit amount
  overallLoss = 0.05; // 5% loss

// Example symbol data
  symbols_popup = [
    { name: 'AAPL', price: 152 },
    { name: 'TSLA', price: 710 },
    { name: 'GOOGL', price: 2800 }
  ];
  symbols = [
    { name: 'AAPL', open: 150, high: 155, low: 148, price: 152, quantity: 10 },
    { name: 'TSLA', open: 700, high: 720, low: 690, price: 710, quantity: 5 },
  ];

  positions = [
    { stock: 'AAPL', quantity: 10, avgPrice: 150, currentPrice: 155, profitLoss: 50 },
    { stock: 'TSLA', quantity: 5, avgPrice: 700, currentPrice: 680, profitLoss: -100 },
  ];

  holdings = [
    { asset: 'AAPL', quantity: 20, value: 3000, change: 0.05 },
    { asset: 'MSFT', quantity: 15, value: 2500, change: -0.02 },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      stockSymbol: ['']
    });

    this.tradeForm = this.fb.group({
      quantity: [1] // Default buy/sell quantity
    });
  }

  setTab(tabName: string) {
    this.selectedTab = tabName;
  }

  // Open Popup for Search, Buy, or Sell
  openPopup(type: 'search' | 'buy' | 'sell', symbol?: any) {
    this.transactionType = type;
    this.selectedSymbol = symbol || null;
    
    if (type === 'search') {
        this.popupTitle = 'Search Symbol';
    } else if (type === 'buy') {
        this.popupTitle = `Buy ${symbol.name}`;
        this.tradeForm.patchValue({ quantity: 1 });
    } else {
        this.popupTitle = `Sell ${symbol.name}`;
        this.tradeForm.patchValue({ quantity: 1 });
    }

    // ✅ Ensure popup message is retained
    this.showPopup = true;
}

  // Search for Symbol
  onSearch() {
    const searchSymbol = this.searchForm.value.stockSymbol.trim().toUpperCase();

    // ✅ Reset popup state
    this.selectedSymbol = null;
    this.popupTitle = 'Search Symbol';
    this.transactionType = 'search';

    if (!searchSymbol) {
        // ✅ Set error message for empty input
        this.popupMessage = '⚠️ Please enter a symbol to search.';
        this.showPopup = true; // ✅ Open popup to display message
        return;
    }

    const foundSymbol = this.symbols_popup.find(s => s.name === searchSymbol);

    if (foundSymbol) {
        this.selectedSymbol = foundSymbol;
        this.popupMessage = ''; // ✅ Clear any previous message
    } else {
        this.popupMessage = `❌ Symbol "${searchSymbol}" does not exist.`;
    }

    this.showPopup = true; // ✅ Always show the popup
}


  // Add symbol to portfolio (Mocked Backend Call)
  addSymbol() {
    console.log(`Adding ${this.selectedSymbol?.name} to portfolio.`);
    this.closePopup();
  }

  // Execute Buy/Sell Transaction
  executeTrade() {
    const quantity = this.tradeForm.value.quantity;

    if (quantity <= 0) {
      this.popupMessage = 'Please provide at least 1 quantity.';
      return;
    }

    if (this.transactionType === 'sell') {
      if (quantity > this.selectedSymbol.quantity) {
        this.popupMessage = `You have only ${this.selectedSymbol.quantity} shares. Maximum allowed: ${this.selectedSymbol.quantity}.`;
        return;
      }
      this.selectedSymbol.quantity -= quantity;
    } else {
      this.selectedSymbol.quantity += quantity;
    }

    console.log(`${this.transactionType === 'buy' ? 'Bought' : 'Sold'} ${quantity} of ${this.selectedSymbol.name}`);
    this.closePopup();
  }

  // Close Popup
  closePopup() {
    this.showPopup = false; // ✅ Hide popup
    this.selectedSymbol = null; // ✅ Reset symbol data
    this.transactionType = null; // ✅ Reset action type
    this.popupTitle = ''; // ✅ Reset title
    this.popupMessage = ''; // ✅ Clear any error messages
    this.tradeForm.reset({ quantity: 1 }); // ✅ Reset trade input
}

  previousPrices: { [key: string]: number } = {}; // Store previous prices



  // Function to determine price color (Green if increased, Red if decreased)
  getPriceColor(symbolName: string, currentPrice: number): string {
    const prevPrice = this.previousPrices[symbolName] || currentPrice;
    return currentPrice > prevPrice ? 'green' : currentPrice < prevPrice ? 'red' : 'black';
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
