import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-admin-side-nav',
  templateUrl: './admin-side-nav.component.html',
  styleUrls: ['./admin-side-nav.component.css']
})
export class AdminSideNavComponent {

  @Output() pageChange: EventEmitter<string> = new EventEmitter<string>();

  curPage:string='bookings';

  changePage(page: string) {
    this.pageChange.emit(page);
    this.curPage = page;
  }

  ngOnInit(){
    this.pageChange.emit(this.curPage);
  }
}
