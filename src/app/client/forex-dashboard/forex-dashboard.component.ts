import {Component, OnInit} from '@angular/core';


interface ForexData {
  currencyPair: string;
  rate: number;
  history: number[];
}
@Component({
  selector: 'app-forex-dashboard',
  templateUrl: './forex-dashboard.component.html',
  styleUrls: ['./forex-dashboard.component.css']
})
export class ForexDashboardComponent implements OnInit
{
  ngOnInit(): void {
  }

}
