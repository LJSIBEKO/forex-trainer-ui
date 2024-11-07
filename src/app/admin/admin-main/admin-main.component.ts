import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent {
  currentPage: string='';

  onPageChange(page: string) {
    this.currentPage = page;
    console.log(`Navigating to ${page}`);
  }
}
