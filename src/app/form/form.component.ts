import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductForm } from '../shared/models/product.model';
import { ProductComponent } from '../shop/product/product.component';

@Component({
  standalone: true,
  selector: 'app-form',
  templateUrl: './form.component.html',
  imports: [ReactiveFormsModule, ProductComponent],
})
export class FormComponent {
  productForm = new FormGroup<ProductForm>({
    id: new FormControl<number>(0),
    name: new FormControl<string>('', Validators.required),
    description: new FormControl<string>('', Validators.required),
    price: new FormControl<number>(0, Validators.required),
    discount: new FormControl<number>(0, Validators.required),
    imagePath: new FormControl<string>('', Validators.required),
  });

  onSubmit() {
    console.log(this.productForm.value);
  }
}
