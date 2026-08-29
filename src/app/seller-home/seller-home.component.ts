import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { faTrash, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { SellerService } from '../services/seller.service';
import { isBrowser } from '../shared/browser.util';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.scss'
})
export class SellerHomeComponent implements OnInit {
  productList: any[] | undefined
  productMessage: undefined | string;
  icon1 = faTrash;
  icon2 = faUserPen;

  constructor(private product: ProductService, private sellerService: SellerService, private router: Router) {

  }

  goToAddProduct() {
    this.router.navigate(['/sellerAddProduct']);
  }
  ngOnInit(): void {
    this.list();
    this.product.updateSellerHome.subscribe(()=>{
      this.list();
    })
  }

  deleteProduct(id: number) {
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = "Product is deleted";
        this.list();
      }
    })
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000)
  }

  list() {
    if (!isBrowser()) {
      return;
    }
    const data = localStorage.getItem('seller');
    if (data) {
      const sellerData = JSON.parse(data);
      this.productList = sellerData;
    }


    this.product.productList(this.productList)
      .subscribe((result) => {
        if (result) {
          this.productList = result

        }
      })

    this.sellerService.signUpSuccess.subscribe(() => {

      this.product.onSignUpProductList(this.productList)
        .subscribe((result) => {
          if (result) {
            this.productList = result

          }
        })

    });
  }

}
