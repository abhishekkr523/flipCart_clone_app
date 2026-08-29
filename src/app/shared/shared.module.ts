import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ProductCardComponent } from './product-card/product-card.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from './empty-state/empty-state.component';

@NgModule({
  declarations: [
    ProductCardComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
    FontAwesomeModule
  ],
  exports: [
    ProductCardComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent
  ]
})
export class SharedModule { }
