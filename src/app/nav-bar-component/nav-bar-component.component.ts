import { Component, OnDestroy } from '@angular/core';
import { LinkDisplay } from './../Interface/LinkDisplay'; 
import { NavBarService } from '../nav-bar.service';

@Component({
  selector: 'app-nav-bar-component',
  standalone: true,
  imports: [],
  template: ` 
  <nav>
    <a href="#home">Home</a>
    <a href="#about">About</a>
    <a href="#services">Services</a>
    <a href="#contact">Contact</a>
  </nav>`
})
export class NavBarComponentComponent implements LinkDisplay, OnDestroy {
  constructor(private navBarService: NavBarService) {}

  ngOnDestroy(): void {
    this.navBarService.ngOnDestroy(); 
    console.log('NavBarComponent cleanup performed!');
  }

  displayLinks(): void {
    this.navBarService.displayLinks(); 
  }
}
