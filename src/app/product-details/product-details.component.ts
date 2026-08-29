import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
import { isBrowser } from '../shared/browser.util';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | Product;
  productQuantity: number = 1;
  removeCart = false;
  cartData: any | undefined

  constructor(private activateRout: ActivatedRoute, private product: ProductService) {

  }
  ngOnInit(): void {
    let productId = this.activateRout.snapshot.paramMap.get('productId');
    productId && this.product.getProduct(productId).subscribe((result) => {
      this.productData = result;

      if (!isBrowser()) {
        return;
      }
      let user = localStorage.getItem('users');
      if (user) {
        let userId = user && JSON.parse(user).id;
        this.product.getCartList(userId);
        this.product.cartData.subscribe((result) => {
          let item = result.filter((item: any) => item && productId && item.productId === productId);

          if (item.length) {
            this.cartData = item[0]
            this.removeCart = true;
          }
        })
      }

    })
  }
  handelQuantity(val: string) {
    if (this.productQuantity >= 0 && val === 'plus') {
      this.productQuantity += 1
    } else {
      if (this.productQuantity > 1)
        this.productQuantity -= 1
    }
  }
  addToCart() {
    if (this.productData) {
      this.product.addProductToCart(this.productData, this.productQuantity);
      this.removeCart = false;
    }
  }

  removeToCart(producId: any) {
    if (!localStorage.getItem('users')) {
      this.product.removeItemFromCart(producId);
      this.removeCart = false;

    } else {
      this.cartData && this.product.removeToCart(this.cartData.id).subscribe((result) => {
        let user = localStorage.getItem('users');
        let userId = user && JSON.parse(user).id;
        this.product.getCartList(userId);
      })
      this.removeCart = false;
      
    }
  }
}
