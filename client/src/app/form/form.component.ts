import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductForm } from '../shared/models/product.model';
import { ProductComponent } from '../shop/product/product.component';
import { CommonModule } from '@angular/common';
import { urlValidator } from '../shared/validators/url.validator';

@Component({
  standalone: true,
  selector: 'app-form',
  templateUrl: './form.component.html',
  imports: [ReactiveFormsModule, ProductComponent, FormsModule, CommonModule],
})
export class FormComponent implements OnInit {
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

  productForm = new FormGroup<ProductForm>({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    description: new FormControl<string>('', Validators.required),
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

  onSubmit() {
    console.log(this.productForm.value);
  }

  ngOnInit(): void {
    console.log(this.discountFieldIsDisplayed);
    console.log(this.productFormControl.name.errors);
    console.log(this.productForm.value);
  }
}
