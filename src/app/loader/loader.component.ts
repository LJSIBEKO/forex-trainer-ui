import { Component } from '@angular/core';
import {LoaderService} from "../service/loader.service";

@Component({
  selector: 'app-loader',
  template: `
    <div *ngIf="loading | async" class="loader-overlay">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `,
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {

  loading = this.loaderService.loading$;

  constructor(private loaderService: LoaderService) {}

}
