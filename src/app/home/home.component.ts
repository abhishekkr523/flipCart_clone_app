import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  popularProduct: undefined | any[];
  trendyProduct: undefined | Product[];
  loading = true;

  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.product.popularProduct().subscribe((result) => {
      this.popularProduct = result;
    });

    this.product.trendyProduct(20).subscribe((result) => {
      this.trendyProduct = result;
      this.loading = false;
    });
  }

  onAddToCart(product: Product): void {
    this.product.addProductToCart(product, 1);
  }
}
