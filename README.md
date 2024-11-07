### Introduction

In contemporary software development, following solid design principles is essential for building applications that are not only functional but also maintainable, scalable, and easily testable. Among the most influential guidelines for achieving this are the SOLID principles. These five principles provide a structured approach to improving the design and architecture of applications, making them more robust and adaptable. In this article, we will delve into each SOLID principle and demonstrate how they can be effectively implemented in Angular projects to enhance both the quality and maintainability of your codebase.

### The SOLID Principles

* **Single Responsibility Principle (SRP):** Each class should have one and only one reason to change, meaning it should focus on a single task or responsibility. This principle encourages dividing complex functionality into smaller, more manageable components, ensuring that classes are easier to maintain and modify without affecting unrelated parts of the system.
    
* **Open-Closed Principle (OCP):** Software entities, such as classes and modules, should be open for extension but closed for modification. This means you should be able to add new functionality to an existing system without changing its core structure. By using techniques like inheritance and interfaces, OCP promotes extensibility and reduces the risk of introducing bugs when adding new features.
    
* **Liskov Substitution Principle (LSP):** Objects of a subclass should be able to replace objects of the base class without altering the correctness of the program. This ensures that subclasses honor the contract established by their base classes, providing predictable behavior and reducing the likelihood of errors when substituting one object for another.
    
* **Interface Segregation Principle (ISP):** Clients should not be forced to depend on interfaces they do not use. ISP advocates for creating smaller, more specific interfaces rather than large, monolithic ones. This leads to better separation of concerns and allows clients to only interact with the functionality that is relevant to them, improving both flexibility and clarity in the design.
    
* **Dependency Inversion Principle (DIP):** High-level modules should not depend on low-level modules; instead, both should depend on abstractions. This principle encourages the decoupling of the core functionality from the implementation details, promoting flexibility and making the system more modular. By relying on interfaces or abstract classes, you ensure that changes in lower-level modules don't impact the higher-level logic.
    

By adhering to the SOLID principles, you can create Angular applications that are more modular, easier to maintain, and better equipped for future growth and changes.

### 1\. Single Responsibility Principle (SRP)

The `NavBarComponentComponent` adheres to the Single Responsibility Principle (SRP) by focusing solely on rendering the navigation bar with its links, without mixing other concerns like data management or business logic. This separation ensures that the component remains easy to maintain, as any changes related to the layout or functionality of the navigation bar will not affect other parts of the application.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar-component',
  standalone: true,
  imports: [],
  template: ` <nav>
  <a href="#home">Home</a>
  <a href="#about">About</a>
  <a href="#services">Services</a>
  <a href="#contact">Contact</a>
</nav>`
})
export class NavBarComponentComponent {

}
```

### 2\. **Open/Closed Principle (OCP)**

In this code, the `NavBarComponentComponent` implements the `OnDestroy` interface, which adheres to the Open/Closed Principle (OCP) by allowing the component to handle cleanup tasks when it is destroyed without modifying its core logic. By implementing `ngOnDestroy()`, the component is open to extending its functionality (e.g., resource cleanup) while keeping the original component behavior intact.

```typescript
import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-nav-bar-component',
  standalone: true,
  imports: [],
  template: ` <nav>
  <a href="#home">Home</a>
  <a href="#about">About</a>
  <a href="#services">Services</a>
  <a href="#contact">Contact</a>
</nav>`
})
export class NavBarComponentComponent implements OnDestroy{
ngOnDestroy(): void {
  console.log("Hell Bhie!")
}
}
```

### 3\. **Liskov Substitution Principle (LSP)**:

In this code, the `CustomNavBarComponent` extends `NavBarComponentComponent`, adhering to the **Liskov Substitution Principle (LSP)** by ensuring that the subclass can be substituted for the base class without breaking the application's behavior. The `ngOnDestroy()` method is overridden to add custom cleanup logic while still calling the base class's `ngOnDestroy()` to maintain the original functionality.

```typescript
import { Component } from '@angular/core';
import { NavBarComponentComponent } from '../nav-bar-component/nav-bar-component.component';
@Component({
  selector: 'app-custom-nav-bar',
  standalone: true,
  imports: [],
  template:  `<nav>
  <a href="#home">Home</a>
  <a href="#about">About</a>
  <a href="#custom">Custom Link</a> 
  <a href="#contact">Contact</a>
</nav>`
})

export class CustomNavBarComponent extends NavBarComponentComponent {
  override ngOnDestroy(): void {
    super.ngOnDestroy();
    console.log("CustomNavBarComponent is being destroyed with extra cleanup!");
  }
}
```

### 4\. **Interface Segregation Principle (ISP)**:

The **Interface Segregation Principle (ISP)** is applied by splitting the navbar functionality into smaller, more focused interfaces: `LinkDisplay` for displaying links and `NavBarAction` for handling lifecycle actions like cleanup. This approach ensures that components only implement the interfaces relevant to their behavior, without being forced to include methods they do not use, thus adhering to ISP.

```typescript
import { Component } from '@angular/core';
import { NavBarComponentComponent } from './../nav-bar-component/nav-bar-component.component';
import { NavBarAction } from './../Interface/NavBarAction';
import { LinkDisplay } from './../Interface/LinkDisplay';

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
export class CustomNavBarComponent extends NavBarComponentComponent implements LinkDisplay, NavBarAction {
  override displayLinks(): void {
    console.log('Displaying custom navbar links');
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    console.log('CustomNavBarComponent is being destroyed with extra cleanup!');
  }
}
```

Create a folder `interface` and under it create two typescript, `LinkDisplay` and `NavBarAction`.

```typescript
export interface LinkDisplay {
    displayLinks(): void;
  }
  
```

```typescript
export interface NavBarAction {
    ngOnDestroy(): void;
  }
  
```

update the `NavBArComponentComponent`.

```typescript
import { Component, OnDestroy } from '@angular/core';
import { LinkDisplay } from './../Interface/LinkDisplay'; 

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
  displayLinks(): void {
    console.log('Displaying default navbar links');
  }
  ngOnDestroy(): void {
    console.log("Hell Bhie!")
  }
}
```

### 5\. **Dependency Inversion Principle (DIP)**:

The `NavBarComponentComponent` now depends on the `NavBarService`, which handles the logic for displaying links and performing cleanup actions, rather than managing those behaviors directly within the component. This adheres to the **Dependency Inversion Principle (DIP)** because the component no longer depends on concrete implementations but on abstractions (i.e., the `NavBarService`), making the component more flexible and easier to maintain.

```typescript
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
```

```typescript
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
```