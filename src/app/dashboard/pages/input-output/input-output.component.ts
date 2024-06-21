import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCardComponent } from './ui/product-card/product-card.component';

import { Product } from '@interfaces/Product';
import { interval, take, tap } from 'rxjs';

@Component({
  selector: 'app-input-output',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './input-output.component.html',
  styleUrl: './input-output.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InputOutputComponent {
  public products = signal<Product[]>([
    {
      id: 1,
      name: `Product 1`,
      quantity: 0,
    },
    {
      id: 2,
      name: `Product 2`,
      quantity: 0,
    },
  ]);

  private intervalSubcription = interval(1000)
    .pipe(
      tap(() => {
        this.products.update((products) => [
          ...products,
          {
            id: products.length + 1,
            name: `Product ${products.length + 1}`,
            quantity: 0,
          },
        ]);
      }),
      take(7)
    )
    .subscribe();

  ngOnDestroy(): void {
    this.intervalSubcription.unsubscribe();
  }

  public updateProdcut(product: Product, quantity: number) {
    this.products.update((products) =>
      products.map((p) => (p.id === product.id ? { ...p, quantity } : p))
    );
  }
}
