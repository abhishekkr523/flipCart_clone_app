import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../data-type';
import { getDiscountPercent } from '../pricing.util';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product: Product | undefined;
  @Input() showAddToCart = true;
  @Output() addToCart = new EventEmitter<Product>();

  get discountPercent(): number {
    if (!this.product) {
      return 0;
    }
    return getDiscountPercent(this.product.mrp, this.product.price);
  }

  onAddToCart(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    if (this.product) {
      this.addToCart.emit(this.product);
    }
  }
}
