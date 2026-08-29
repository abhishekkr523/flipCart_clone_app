import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit{
  searchResult: undefined | Product[];
  loading = true;
  query: string | null = '';

  constructor(private activatedRout:ActivatedRoute,private product:ProductService){

  }

  ngOnInit(): void {
    this.query = this.activatedRout.snapshot.paramMap.get('query');
    if (this.query) {
      this.product.searchProduct(this.query).subscribe((result)=>{
        this.searchResult = result;
        this.loading = false;
      })
    } else {
      this.loading = false;
    }
  }

  onAddToCart(product: Product): void {
    this.product.addProductToCart(product, 1);
  }
}
