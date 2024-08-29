import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: any[] = [

    {
      product: {
        name: "Iphone 14",
        image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQjFqzcDmUbt_IdnFGBbCKIFFaOv0a6Cy4Uj1OZPtYgwAyKS79oZ8yOChDkFRKHBWp_4iSb1-ABkY9GW42j9l_jMfQ2d7NPx_ax5DGRTXTefAbugPdDCyfHpoG7XcrbfUEM3RIC1hzoeg&usqp=CAc",
        price: 1899.99
      },
      quantity: 2
    },
    {
      product: {
        name: "iPhone 12 Pro Max",
        image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ-Mc7JQ-0wEepO8-HanouNTmppOD-qLEV2nOcBenkEoqwLFYSaCUDGPElqQn42Nrp3a9mRTIO5sLGddzIv_2Ffxz7KfdUkEDiNbSnNELzL02cFEyHfb37GUWwHhXXYeX_hM9-4HZMeXOs&usqp=CAc",
        price: 1099.99
      },
      quantity: 1
    }
  ];

  calculateTotalPrice(): number {
    let totalPrice = 0;
    this.cartItems.forEach(item => {
      totalPrice += item.product.price * item.quantity;
    });
    return totalPrice;
  }

  removeItem(index: number): void {
    this.cartItems.splice(index, 1);
  }

  increaseQuantity(index: number): void {
    this.cartItems[index].quantity++;
  }

  decreaseQuantity(index: number): void {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
    }
  }
}
