import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StockService } from 'src/app/services/stock.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { HoldingsComponent } from '../holdings/holdings.component';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userId = 'SPM_873127';
  
  @ViewChild('holdingsComponent') holdingsComponent!: HoldingsComponent;

  onTabChange(event: MatTabChangeEvent): void {
    if (event.index === 1) { // Index 1 = Holdings Tab
      this.holdingsComponent.reloadHoldings();
    }
  }


  constructor(private fb: FormBuilder,private stockService: StockService,private dialog: MatDialog) {}

  ngOnInit() {
    
   
  }

}
