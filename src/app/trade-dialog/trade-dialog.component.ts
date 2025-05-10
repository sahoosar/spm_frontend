import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StockService } from '../services/stock.service';
import { AuthService } from '../services/auth.service';

interface TradeData {
  symbol: string;
  price: number;
  operation: 'buy' | 'sell';
}

@Component({
  selector: 'app-trade-dialog',
  templateUrl: './trade-dialog.component.html',
  styleUrls: ['./trade-dialog.component.css']
})
export class TradeDialogComponent {
  quantity: number = 1;

  constructor(
    public dialogRef: MatDialogRef<TradeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TradeData,
    private stockService: StockService,
    private authService: AuthService,
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onExecute(): void {
    const tradeRequest = {
      userId: this.authService.getLoggedInUserId(),
      symbol: this.data.symbol,
      price: this.data.price,
      quantity: this.quantity,
      operation: this.data.operation
    };

    this.stockService.addStockToHoldings( tradeRequest).subscribe(
      response => {
        console.log('Trade successful', response);
        this.dialogRef.close(true);
      },
      error => {
        console.error('Trade failed', error);
      }
    );
  }
}
