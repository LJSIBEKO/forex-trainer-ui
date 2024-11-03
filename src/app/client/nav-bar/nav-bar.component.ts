import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  @Output() pageChange: EventEmitter<string> = new EventEmitter<string>();

  changePage(page: string) {
    this.pageChange.emit(page);
  }

  ngOnInit(){
    this.pageChange.emit('courses');
  }

}
