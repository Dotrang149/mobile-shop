import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { faL, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    FontAwesomeModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent{
  faShoppingCart = faShoppingCart;
  isAdmin: boolean = false;
  isCustomer: boolean = false;
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(){
    if (this.authService.isLoggedIn()) {
      this.authService.getRole().subscribe({
        next: (role) => {
          if (role === 'User is in Admin role') {
            this.isAdmin = true;
          } else if (role === 'User is in Customer role') {
            this.isCustomer = true;
          }
        },
        error: (err) => {
          console.error('Error checking role', err);
        }
      });
    }
  }

  setFalse(){
    this.isAdmin = false;
    this.isCustomer = false;
  }

}

