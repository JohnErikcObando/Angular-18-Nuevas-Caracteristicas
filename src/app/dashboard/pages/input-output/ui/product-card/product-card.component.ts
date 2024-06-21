import {
  Component,
  EventEmitter,
  Input,
  Output,
  effect,
  input,
  output,
} from '@angular/core';
import { Product } from '../../../../../interfaces/Product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  // @Input({
  //   required: true,
  // })
  // Product!: Product;

  public product = input.required<Product>({});

  // @Output()
  // public onIncrementQuantity = new EventEmitter<number>();

  public onIncrementQuantity = output<number>();

  public incrementQuantity(): void {
    this.onIncrementQuantity.emit(this.product().quantity + 1);
  }

  public logginEffect = effect(() => {
    console.log(this.product().name);
  });
}
