import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { HoldingsComponent } from '../holdings/holdings.component';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  @ViewChild('holdingsComponent') holdingsComponent!: HoldingsComponent;

  onTabChange(event: MatTabChangeEvent): void {
    if (event.index === 1) { // Index 1 = Holdings Tab
      this.holdingsComponent.reloadHoldings();
    }
  }


  constructor() {}

  ngOnInit() {
    
   
  }

}
