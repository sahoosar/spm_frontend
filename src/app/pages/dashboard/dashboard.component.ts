import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StockService } from 'src/app/services/stock.service';
//import { Stock } from 'src/app/models/stock.model';
import { BehaviorSubject,Observable } from 'rxjs';
import { take,tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { StockPopupComponent } from 'src/app/stock-popup/stock-popup.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userId = 'SPM_873127';
  
  searchResult: any = null;
  private stockListSubject = new BehaviorSubject<any[]>([]);
  stockList$ = this.stockListSubject.asObservable();

  
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


  holdings = [
    { asset: 'AAPL', quantity: 20, value: 3000, change: 0.05 },
    { asset: 'MSFT', quantity: 15, value: 2500, change: -0.02 },
  ];
// Field Declaration Finish

  constructor(private fb: FormBuilder,private stockService: StockService,private dialog: MatDialog) {}

  ngOnInit() {
    
      this.loadStockList();
    
    this.searchForm = this.fb.group({
      stockSymbol: ['']
    });

    this.tradeForm = this.fb.group({
      stockName: '',
      quantity: [1] // Default buy/sell quantity
    });
  }
  // ✅ Fetch user's stock list from backend
  loadStockList(): void {
    this.stockService.getUserStockList(this.userId).subscribe(
      (stocks) => {
        this.stockListSubject.next(stocks);
      },
      (error) => {
        console.error('Error loading stock list:', error);
      }
    );
  }
  setTab(tabName: string) {
    this.selectedTab = tabName;
  }

  // Open Popup for Search, Buy, or Sell
   openPopup(type: 'search' | 'buy' | 'sell', symbol?: any) {
    this.stockList$.subscribe((stocks) => {
      const stock = stocks.find(s => s.stockSymbol === symbol.stockSymbol);
      if (stock) {
        this.transactionType = type;
        this.selectedSymbol = stock;
      } else {
        console.error('Stock not found:', symbol);
      }
    });
    if (type === 'buy') {
      this.popupTitle = `Buy ${symbol.stockSymbol}`;
      this.tradeForm.patchValue({ quantity: 2 ,stockName:symbol.stockName});
  } else {
      this.popupTitle = `Sell ${symbol.stockSymbol}`;
      this.tradeForm.patchValue({ quantity: 1 ,stockName:symbol.stockName});
  }

  // Ensure popup message is retained
  this.showPopup = true;
} 

   
   

  // Search for Symbol
  onSearch() {
    const searchSymbol = this.searchForm.value.stockSymbol.trim().toUpperCase();

    // Reset popup state
    this.selectedSymbol = null;
    this.popupTitle = 'Search Symbol';
    this.transactionType = 'search';

    if (!searchSymbol) {
        // Set error message for empty input
        this.popupMessage = '⚠️ Please enter a symbol to search.';
        this.showPopup = true; 
        return;
    }
    this.stockService.searchSymbols(searchSymbol).pipe(
      tap(data => {
        if (data.stockSymbol === searchSymbol) {  
                  this.openStockPopup(data);
        } else {
          this.showErrorPopup('No such symbol found! Please try again.');
        }
      })
    ).subscribe();
      
  
}
showErrorPopup(message: string): void {
  this.dialog.open(StockPopupComponent, {
    width: '400px',
    data: { error: message }
  });
}

openStockPopup(stock: any): void {
  const dialogRef = this.dialog.open(StockPopupComponent, {
    width: '400px',
    data: stock
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result?.action === 'add') {
      this.loadStockList(); // Refresh stock list
    } 
  });
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
    this.showPopup = false; //  Hide popup
    this.selectedSymbol = null; //  Reset symbol data
    this.transactionType = null; // Reset action type
    this.popupTitle = ''; //  Reset title
    this.popupMessage = ''; // Clear any error messages
    this.tradeForm.reset({ quantity: 1 ,stockName:''}); // Reset trade input
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


buyStock(stock: any): void {
  console.log('Buying stock:', stock.symbol);
  alert(`Bought stock: ${stock.symbol} at $${stock.price}`);
}

// ✅ Sell Stock Action
sellStock(stock: any): void {
  console.log('Selling stock:', stock.symbol);
  alert(`Sold stock: ${stock.symbol} at $${stock.price}`);
}

// ✅ Remove stock from the user's stock list
removeFromStockList(stockId: number): void {
  this.stockService.removeStockFromUser(stockId).subscribe(
    () => {
      this.loadStockList(); // Refresh stock list after removal
    },
    (error) => {
      console.error('Error removing stock:', error);
    }
  );
}
}
