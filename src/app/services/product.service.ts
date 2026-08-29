import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { baseurl,endpoints } from './constant';
import { OrderStatus, Product } from '../data-type';
import { isBrowser } from '../shared/browser.util';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData = new EventEmitter<any[] | []>();
  cartDataHeader = new EventEmitter<any[] | []>();
  updateSellerHome = new EventEmitter<void>();
  constructor(private http: HttpClient) { }

  addProduct(data: any) {
    return this.http.post(`${baseurl}${endpoints.addProduct}`, data);
  }


  productList(data:any) {
    return this.http.get<any>(`${baseurl}${endpoints.addProduct}?sellerEmail=${data.email}`);
  }
  onSignUpProductList(data:any) {
    return this.http.get<any>(`${baseurl}${endpoints.addProduct}?sellerEmail=${data.email}`);
  }


  deleteProduct(id: number) {
    return this.http.delete(`${baseurl}${endpoints.addProduct}/${id}`);
  }
  getProduct(id: string) {
    return this.http.get<any>(`${baseurl}${endpoints.addProduct}/${id}`)
  }
  updateProduct(product: any) {
    return this.http.put<any>(`${baseurl}${endpoints.addProduct}/${product.id}`, product);
  }
  popularProduct() {
    return this.http.get<any>(`${baseurl}${endpoints.addProduct}?_limit=3`);
  }
  trendyProduct(limit: number) {
    return this.http.get<any>(`${baseurl}${endpoints.addProduct}?_limit=${limit}`);
  }
  searchProduct(query: string) {
    return this.http.get<any[]>(`${baseurl}${endpoints.addProduct}?name_like=${query}`);
  }
  localAddToCart(data: any) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      
      console.log("data",data);
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }
  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: any[] = JSON.parse(cartData);
      items = items.filter((item: any) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addProductToCart(product: Product, quantity: number): void {
    const item: any = { ...product, quantity };
    if (!localStorage.getItem('users')) {
      this.localAddToCart(item);
      return;
    }
    const userStore = localStorage.getItem('users');
    const userId = userStore && JSON.parse(userStore).id;
    const cartData: any = { ...item, userId, productId: product.id };
    delete cartData.id;
    this.addToCart(cartData).subscribe((result) => {
      if (result) {
        this.getCartList(userId);
      }
    });
  }

  mergeLocalCartToRemote(userId: string): void {
    const localCartRaw = localStorage.getItem('localCart');
    if (!localCartRaw) {
      return;
    }
    const items: any[] = JSON.parse(localCartRaw);
    if (!items.length) {
      localStorage.removeItem('localCart');
      return;
    }
    const requests = items.map((item) => {
      const cartData = { ...item, userId, productId: item.id };
      delete cartData.id;
      return this.addToCart(cartData);
    });
    forkJoin(requests).subscribe(() => {
      localStorage.removeItem('localCart');
      this.getCartList(userId);
    });
  }

  addToCart(cartData: any) {
    return this.http.post(`${baseurl}${endpoints.cart}`, cartData);
  }

  getCartList(userId: string) {
    return this.http.get<any[]>(`${baseurl}${endpoints.cart}?userId=` + userId,
      { observe: 'response' }).subscribe((result) => {
        if (result && result.body) {
          this, this.cartData.emit(result.body)
        }
      });

  }

  removeToCart(cartId: number) {
    return this.http.delete(`${baseurl}${endpoints.cart}/` + cartId);
  }
  currentCard() {
    if (!isBrowser()) {
      return of([]);
    }
    let userStore = localStorage.getItem('users');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<any[]>(`${baseurl}${endpoints.cart}?userId=` + userData.id)
  }
  order(data: any) {
    return this.http.post<any>(`${baseurl}${endpoints.order}`, data)
  }
  orderList() {
    if (!isBrowser()) {
      return of([]);
    }
    let userStore = localStorage.getItem('users');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<any>(`${baseurl}${endpoints.order}?userId=` + userData.id)
  }
  deleteCartItems(cartId:number){
    return this.http.delete(`${baseurl}${endpoints.cart}/` + cartId,{observe:'response'}).subscribe((result)=>{
      if(result){
        this.cartData.emit([])
      }
    });
  }
  cancelOrder(orderId:number){
    return this.http.delete(`${baseurl}${endpoints.order}/`+orderId)
  }
  updateOrderStatus(orderId: string, status: OrderStatus) {
    return this.http.patch(`${baseurl}${endpoints.order}/${orderId}`, { status });
  }
}
