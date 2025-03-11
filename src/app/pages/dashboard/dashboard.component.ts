import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searchForm: FormGroup;
  stock: any = null;
  symbols: any[] = [];
  selectedSymbol: any = null;
  showPopup: boolean = false;

  @ViewChild('tableContainer') tableContainer!: ElementRef;

  constructor(private fb: FormBuilder, private stockService: StockService) {
    this.searchForm = this.fb.group({
      stockSymbol: ['']
    });
  }

  ngOnInit(): void {
    this.loadSymbols();
  }

  // ✅ Load stock symbols into the table
  loadSymbols(): void {
    this.stockService.getSymbols().subscribe(data => {
      this.symbols = data;
      setTimeout(() => this.scrollToBottom(), 100);
    });
  }

  // ✅ Trigger search only when clicking the search button
  onSearch(): void {
    const symbol = this.searchForm.value.stockSymbol.trim();
    if (!symbol) {
      alert('❌ Please enter a valid stock symbol.');
      return;
    }

    this.stockService.searchSymbols(symbol).subscribe({
      next: (data) => {
        if (!data || Object.keys(data).length === 0) {
          alert(`⚠️ Symbol "${symbol}" not found. Please enter a valid symbol.`);
          return;
        }

        this.stock = data;
        this.selectedSymbol = data;
        this.showPopup = true;

        // ✅ Show success alert with stock details
        alert(`✅ Stock Found:\nSymbol: ${data.name}\nPrice: $${data.price}`);
      },
      error: (err) => {
        console.error('Error fetching stock data:', err);
        alert(`❌ Error: Unable to fetch data for "${symbol}". Please try again.`);
      }
    });
  }

  // ✅ Add selected stock to the list
  addSymbol(): void {
    if (!this.selectedSymbol) return;

    this.stockService.addSymbol(this.selectedSymbol).subscribe(response => {
      this.showPopup = false;
      this.loadSymbols();
      setTimeout(() => this.scrollToBottom(), 200);

      // ✅ Show alert with response message
      alert(`✅ Stock Added Successfully!\nSymbol: ${this.selectedSymbol.name}\nPrice: $${this.selectedSymbol.price}`);
    });
  }

  // ✅ Close popup
  closePopup(): void {
    this.showPopup = false;
  }

  // ✅ Scroll to the bottom of the stock list
  scrollToBottom(): void {
    if (this.tableContainer) {
      this.tableContainer.nativeElement.scrollTop = this.tableContainer.nativeElement.scrollHeight;
    }
  }
}
