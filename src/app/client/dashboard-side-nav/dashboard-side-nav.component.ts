import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard-side-nav',
  templateUrl: './dashboard-side-nav.component.html',
  styleUrls: ['./dashboard-side-nav.component.css']
})
export class DashboardSideNavComponent {

  @Output() pageChange: EventEmitter<string> = new EventEmitter<string>();

  curPage:string='courses';

  changePage(page: string) {
    this.pageChange.emit(page);
    this.curPage = page;
  }

  ngOnInit(){
    this.pageChange.emit(this.curPage);
  }
}
