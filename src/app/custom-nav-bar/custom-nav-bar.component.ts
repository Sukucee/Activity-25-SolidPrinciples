import { Component } from '@angular/core';
import { NavBarComponentComponent } from './../nav-bar-component/nav-bar-component.component';
import { NavBarAction } from './../Interface/NavBarAction';
import { LinkDisplay } from './../Interface/LinkDisplay';
import { NavBarService } from '../nav-bar.service';

@Component({
  selector: 'app-custom-nav-bar',
  standalone: true,
  imports: [],
  template: ` 
  <nav>
    <a href="#home">Home</a>
    <a href="#about">About</a>
    <a href="#custom">Custom Link</a>
    <a href="#contact">Contact</a>
  </nav>`
})
export class CustomNavBarComponent extends NavBarComponentComponent{
  constructor(navBarService: NavBarService) {
    super(navBarService);
  }

  // ngOnDestroy(): void {
  //  this.navBarService.ngOnDestroy(); // Delegate cleanup to service
    //console.log('CustomNavBarComponent cleanup performed!');
 // }
}
