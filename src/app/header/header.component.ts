import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { faCartShopping, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../services/product.service';
import { SellerService } from '../services/seller.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = "";
  searchResult: any[] | undefined;
  cartItem = 0;
  cartIcon = faCartShopping;
  searchIcon = faSearch;
  userIcon = faUser;
  private isBrowser: boolean;


  constructor(private route: Router, private product: ProductService, private sellerService: SellerService, private userService: UserService, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (!this.isBrowser) {
        return;
      }
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore ? JSON.parse(sellerStore) : null;
          this.sellerName = sellerData.name;
          this.menuType = "seller";
        } else if (localStorage.getItem('users')) {
          let userStore = localStorage.getItem('users');
          let userData = userStore ? JSON.parse(userStore) : null;
          this.menuType = "user";
          this.product.getCartList(userData.id)
        } else {
          this.menuType = 'default'
        }
      }

    })

    // Subscribe to the sign-up success event from SellerService
    this.sellerService.signUpSuccess.subscribe(() => {
      this.menuType = 'seller'; // Update menu type after sign-up
    });

    this.userService.signUpSuccess.subscribe(() => {
      this.menuType = 'user'; // Update menu type after sign-up
    });

    this.product.cartData.subscribe((result) => {
      this.cartItem = result.length;
    })

    if (!this.isBrowser) {
      return;
    }

    // Check local storage for menu type
    const menuType = localStorage.getItem('menuType');
    if (menuType === 'seller') {
      this.menuType = 'seller';
    } else if (menuType === 'user') {
      this.menuType = 'user';
    } else {
      this.menuType = 'default';
    }

    let cartData = localStorage.getItem('localCart');

    if (cartData) {
      this.cartItem = JSON.parse(cartData).length;
    }
  }


  sellerLogout() {
    if (!this.isBrowser) {
      return;
    }
    localStorage.removeItem('seller');
    localStorage.removeItem('menuType');

    this.route.navigate(['/seller']);
    let data = JSON.parse(localStorage.getItem("localCart") || "null")?.length;
    this.cartItem = data;
  }

  userLogout() {
    if (!this.isBrowser) {
      return;
    }
    localStorage.removeItem('users');
    localStorage.removeItem('menuType');
    this.route.navigate(['/user-auth']);

    let data = JSON.parse(localStorage.getItem("localCart") || "null")?.length;
    this.cartItem = data;

  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProduct(element.value).subscribe((result) => {
        this.searchResult = result;
      })
    }
  }
  hideSearch() {
    this.searchResult = undefined;
  }


  submitSearch(val: any) {
    this.route.navigate([`search/${val}`]); // Use backticks for string interpolation
  }

  reDirectToDetails(val: number) {
    this.route.navigate(['/product-details/' + val])
  }
}
