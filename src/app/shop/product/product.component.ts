import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent {
  @Input() product: any;
}
