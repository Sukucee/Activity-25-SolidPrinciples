import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {
  displayLinks(): void {
    console.log('Displaying default navbar links');
  }

  ngOnDestroy(): void {
    console.log('NavBarService cleanup performed!');
  }
  constructor() { }
}
