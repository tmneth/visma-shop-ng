import { Component, Input } from '@angular/core';
import { TruncateString } from 'src/app/shared/pipes/truncate-string.pipe';

@Component({
  standalone: true,
  selector: 'app-product',
  templateUrl: './product.component.html',
  imports: [TruncateString],
})
export class ProductComponent {
  @Input() product: any;
}
