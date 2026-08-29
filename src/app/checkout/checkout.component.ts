import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  totalPrice: number | undefined;
  cartData: any | undefined
  ordersms: string | undefined

  constructor(private product: ProductService, private route: Router) {

  }

  ngOnInit(): void {
    this.product.currentCard().subscribe((result) => {

      let price = 0;
      this.cartData = result;
      result.forEach((item) => { price += (+item.price * item.quantity); });
      this.totalPrice = price - price / 10 + price / 20 + price / 50;
    });
  }
  orderNow(data: { email: string, address: string, contact: string }) {
    let user = localStorage.getItem('users');
    let userId = user && JSON.parse(user).id;
    if (this.totalPrice) {
      let orderData: any = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        status: 'Placed',
        placedAt: new Date().toISOString(),
        items: (this.cartData || []).map((item: any) => ({
          productId: item.productId,
          name: item.name,
          url: item.url,
          price: item.price,
          quantity: item.quantity,
          color: item.color
        }))
      }
      this.product.order(orderData).subscribe((result) => {
        if (result) {
          this.cartData?.forEach((item: any) => {
            item.id && this.product.deleteCartItems(item.id);
          });
          this.ordersms = "your order has been placed"
          setTimeout(() => {
            this.route.navigate(['my-orders'])
            this.ordersms = undefined
          }, 4000);
        }
      })
    }

  }
}
