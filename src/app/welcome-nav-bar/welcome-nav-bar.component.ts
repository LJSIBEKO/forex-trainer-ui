import {Component, HostListener,} from '@angular/core';

@Component({
  selector: 'app-welcome-nav-bar',
  templateUrl: './welcome-nav-bar.component.html',
  styleUrls: ['./welcome-nav-bar.component.css']
})
export class WelcomeNavBarComponent {

  isScrolled = false;

  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

}
