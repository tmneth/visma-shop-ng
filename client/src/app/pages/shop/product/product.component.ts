import { Component, Input } from '@angular/core';
import { TruncateString } from 'src/app/shared/pipes/truncate-string.pipe';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from 'src/app/shared/data-services/models/product.view.model';

@Component({
  standalone: true,
  selector: 'app-product',
  templateUrl: './product.component.html',
  imports: [CommonModule, TruncateString, RouterLink],
  animations: [
    trigger('showItemDetails', [
      state(
        'show',
        style({
          'box-shadow': 'inset 0 -70px 40px -40px rgba(0,0,0,.7)',
        })
      ),
      transition('void => show', [
        style({
          'box-shadow': 'inset 0 0px 40px -40px rgba(0,0,0,.6)',
        }),
        animate(75),
      ]),
      transition('show => void', [animate(75)]),
    ]),
  ],
})
export class ProductComponent {
  @Input() product!: Product;
  @Input() isAuthenticated: boolean = false;
  isHovering: boolean = false;
}
