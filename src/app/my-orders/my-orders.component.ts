import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss'
})
export class MyOrdersComponent implements OnInit {
  orderData: any[] | undefined;
  loading = true;
  constructor(private product: ProductService) { }
  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.product.orderList().subscribe((result) => {
      this.orderData = result;
      this.loading = false;
    })
  }

  cancelOrder(orderId: string | undefined) {
    orderId && this.product.updateOrderStatus(orderId, 'Cancelled').subscribe(() => {
      this.loadOrders();
    })
  }

}
