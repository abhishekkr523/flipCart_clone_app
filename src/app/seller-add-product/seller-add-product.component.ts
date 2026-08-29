import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SellerService } from '../services/seller.service';
import { isBrowser } from '../shared/browser.util';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.scss'
})
export class SellerAddProductComponent implements OnInit {
  addProductMessage: string | undefined;
  sellerEmail: any;
  @ViewChild('addProduct') addProductForm: NgForm | undefined; // ViewChild to get the form reference

  constructor(private product: ProductService, private route: Router, private sellerService: SellerService) {

  }
  ngOnInit(): void {
    if (!isBrowser()) {
      return;
    }
    const sellerDataString = localStorage.getItem('seller');

    if (sellerDataString) {
      const sellerData = JSON.parse(sellerDataString);
      this.sellerEmail = sellerData.email;
    }

  }



  submit(data: any) {
    this.product.addProduct(data).subscribe((result) => {
      if (result) {
        this.addProductMessage = "Product is successfully added";

        this.product.cartData.emit(data);
        this.timer();
        
        if (this.addProductForm) {
          this.addProductForm.resetForm(); // Reset the form
        }

      }
     
    })

   

  }
  timer(){
    setTimeout(() => {
      this.addProductMessage = undefined;
      this.route.navigate(['seller-home'])
    }, 1000)

  }
}
