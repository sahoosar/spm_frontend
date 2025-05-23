import { Component, OnInit ,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { HoldingsComponent } from '../holdings/holdings.component';
import { StocklistComponent } from '../stocklist/stocklist.component';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userId: string | null = null;
  userName: string | null = null;
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  @ViewChild(StocklistComponent) stocklistComponent!: StocklistComponent;
  @ViewChild(HoldingsComponent) holdingsComponent!: HoldingsComponent;
  constructor(private route :Router,private authService: AuthService) {}

  refreshTabs() {
    // Reload data from backend for both components
    if (this.stocklistComponent) {
      this.stocklistComponent.loadStockList(); // Fetch new stock data
    }
    if (this.holdingsComponent) {
      this.holdingsComponent.loadHoldings(); // Fetch new holdings data
      this.holdingsComponent.fetchHoldingsData();
    }
  }



  ngOnInit() {
    this.userId = this.authService.getLoggedInUserId(); 
    this.userName = this.authService.getUserName();
  }
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    this.route.navigate(['/login']);
  }

 
}
