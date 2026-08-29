import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent implements OnInit {
  cartData: any[] | undefined;
  loading = true;
  cartSummary: any = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  }

  constructor(private product: ProductService, private router: Router) {

  }
  ngOnInit(): void {
    this.loadDetails();
  }

  checkout() {
    this.router.navigate(['/checkout'])
  }

  continueShopping() {
    this.router.navigate(['/']);
  }

  removeToCart(cartId: number | undefined) {
    cartId && this.cartData && this.product.removeToCart(cartId).subscribe((result) => {
      let user = localStorage.getItem('users');
      let userId = user && JSON.parse(user).id;
      this.product.getCartList(userId);
      this.loadDetails();
    })
  }

  loadDetails() {
    this.product.currentCard().subscribe((result) => {
      this.cartData = result;
      this.loading = false;
      let price = 0;
      result.forEach((item) => { price += (+item.price * item.quantity); });
      this.cartSummary.price = price;

      this.cartSummary.discount = price / 10;
      this.cartSummary.tax = price / 20;
      this.cartSummary.delivery = price / 50;
      this.cartSummary.total = this.cartSummary.price - this.cartSummary.discount + this.cartSummary.tax + this.cartSummary.delivery;
    });
  }

}
