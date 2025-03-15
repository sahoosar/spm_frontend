import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StockService } from 'src/app/services/stock.service';
//import { Stock } from 'src/app/models/stock.model';
import { BehaviorSubject,Observable } from 'rxjs';
import { take,tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { StockPopupComponent } from 'src/app/stock-popup/stock-popup.component';
import { TradeDialogComponent } from 'src/app/trade-dialog/trade-dialog.component';

@Component({
  selector: 'app-holdings',
  templateUrl: './holdings.component.html',
  styleUrls: ['./holdings.component.css']
})
export class HoldingsComponent implements OnInit {

  private holdingsubject = new BehaviorSubject<any[]>([]);
  holdings$ = this.holdingsubject.asObservable();
  tradeForm: FormGroup  = new FormGroup({});

  showPopup = false;
  popupTitle = '';
  popupMessage = '';
  selectedSymbol: any = null;
  transactionType: 'search' | 'buy' | 'sell' | null = 'search';


  constructor(private fb: FormBuilder,
    private stockService: StockService,
    private dialog: MatDialog,
     private auth: AuthService) {}

  ngOnInit(): void {
    this.loadHoldings();
  }
// ✅ Fetch user's stock list from backend
loadHoldings(): void {
  const userId = this.auth.getLoggedInUserId();

  this.stockService.getUserHoldings(`${userId}`).subscribe(
    (stocks) => {
      this.holdingsubject.next(stocks);
    },
    (error) => {
      console.error('Error loading stock list:', error);
    }
  );
}
reloadHoldings(): void {
  const userId = this.auth.getLoggedInUserId();

  this.stockService.getUserHoldings(`${userId}`).subscribe(
    data => {
      this.holdingsubject.next(data);
      console.log('Holdings updated:');
    },
    error => console.error('Error fetching holdings:', error)
  );
}

openTradeDialog(stock: any, operation: 'buy' | 'sell'): void {
  const dialogRef = this.dialog.open(TradeDialogComponent, {
    width: '350px',
    data: { symbol: stock.stockSymbol, price: stock.currentPrice, operation }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Trade executed successfully!');
    }
  });
}

}
