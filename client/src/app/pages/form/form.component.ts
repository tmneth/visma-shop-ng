import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Product,
  ProductForm,
} from '../shared/data-services/models/product.model';
import { ProductComponent } from '../shop/product/product.component';
import { CommonModule } from '@angular/common';
import { urlValidator } from '../../shared/validators/url.validator';
import { ShopService } from '../../shared/data-services/services/shop.data.service';

@Component({
  standalone: true,
  selector: 'app-form',
  templateUrl: './form.component.html',
  imports: [ReactiveFormsModule, ProductComponent, FormsModule, CommonModule],
})
export class FormComponent {
  constructor(private readonly _shop: ShopService) {}

  private _discountFieldIsDisplayed = false;

  get discountFieldIsDisplayed(): boolean {
    return this._discountFieldIsDisplayed;
  }

  set discountFieldIsDisplayed(value: boolean) {
    this._discountFieldIsDisplayed = value;
    this.adjustDiscountField();
  }

  adjustDiscountField() {
    const discountControl = this.productForm.get('discount');
    if (this._discountFieldIsDisplayed) {
      discountControl?.setValidators([
        Validators.required,
        Validators.max(500),
      ]);
    } else {
      discountControl?.setValue(0);
      discountControl?.setValidators(null);
    }
    discountControl?.updateValueAndValidity();
  }

  currentPrice: number = 0;

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl('', Validators.required),
    price: new FormControl<number>(0, [
      Validators.required,
      Validators.max(500),
    ]),
    discount: new FormControl<number>(0, [
      Validators.required,
      Validators.max(500),
    ]),
    imageUrl: new FormControl<string>('', [
      Validators.required,
      urlValidator(),
    ]),
  });

  get productFormControl() {
    return this.productForm.controls;
  }

  formToProduct(form: FormGroup): Product {
    return {
      name: form.get('name')?.value ?? '',
      description: form.get('description')?.value ?? '',
      price: form.get('price')?.value ?? 0,
      discount: form.get('discount')?.value ?? 0,
      imageUrl: form.get('imageUrl')?.value ?? '',
    };
  }

  onSubmit() {
    if (this.productForm.valid) {
      const newProduct: Product = this.formToProduct(this.productForm);

      this._shop.createProduct(newProduct).subscribe(
        (response) => {
          console.log('Product saved successfully', response);
          this.productForm.reset();
        },
        (error) => {
          console.error('Error saving product', error);
        }
      );
    }
  }
}
