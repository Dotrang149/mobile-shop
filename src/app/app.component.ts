import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { FooterComponent } from "./components/footer/footer.component";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { UserManagementComponent } from "./admin/user-management/user-management.component";
import { HomeComponent } from "./components/home/home.component";
import { ProductManagementComponent } from "./admin/product-management/product-management.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    ProductListComponent,
    UserManagementComponent,
    HomeComponent,
    ProductManagementComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mobile-shop';
}
