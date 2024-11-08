import { Injectable } from '@angular/core';
import {interval, map, Observable} from "rxjs";


interface ForexData {
  currencyPair: string;
  rate: number;
  history: number[];
}

@Injectable({
  providedIn: 'root'
})
export class ForexService {

  private forexData: ForexData[] = [
    { currencyPair: 'USD/EUR', rate: 1.10, history: [1.10] },
    { currencyPair: 'GBP/USD', rate: 1.28, history: [1.28] },
    { currencyPair: 'USD/JPY', rate: 109.55, history: [109.55] },
    { currencyPair: 'AUD/USD', rate: 0.74, history: [0.74] }
  ];

  constructor() {}

  getForexData(): Observable<ForexData[]> {
    return interval(1000).pipe(
      map(() => {
        return this.forexData.map(data => {
          const randomChange = (Math.random() - 0.5) * 0.01;
          const newRate = parseFloat((data.rate + randomChange).toFixed(4));

          data.history = [...data.history.slice(-9), newRate];
          data.rate = newRate;
          return { ...data };
        });
      })
    );
  }
}
