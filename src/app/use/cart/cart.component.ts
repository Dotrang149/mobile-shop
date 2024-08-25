import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: any[] = [

    {
      product: {
        name: "Iphone 15",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrUgZqOnXwCjnsKe-BS59j2ib2ApYjs9-SMQ&s",
        price: 100000
      },
      quantity: 2
    },
    {
      product: {
        name: "Iphone 15 promax",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrUgZqOnXwCjnsKe-BS59j2ib2ApYjs9-SMQ&s",
        price: 200000
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
