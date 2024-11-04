import { Component, EventEmitter, Output } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {


  constructor(private router:Router) {
  }
  @Output() pageChange: EventEmitter<string> = new EventEmitter<string>();

  changePage(page: string) {
    this.pageChange.emit(page);
  }

  ngOnInit(){
    this.pageChange.emit('courses');
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }
}
