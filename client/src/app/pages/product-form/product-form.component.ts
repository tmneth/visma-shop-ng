import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  NonNullableFormBuilder,
} from '@angular/forms';
import { Product } from 'src/app/shared/data-services/models/product.view.model';

import { ProductComponent } from '../shop/product/product.component';
import { CommonModule } from '@angular/common';
import { urlValidator } from '../../shared/validators/url.validator';
import { ShopService } from '../../shared/data-services/services/shop.data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  imports: [ReactiveFormsModule, ProductComponent, FormsModule, CommonModule],
})
export class ProductFormComponent implements OnInit {
  constructor(
    private shop: ShopService,
    private fb: NonNullableFormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  isEditing: boolean = false;
  productId?: string;

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

  productForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    description: [''],
    price: [0, [Validators.required, Validators.max(500)]],
    discount: [0, [Validators.required, Validators.max(500)]],
    imageUrl: ['', [Validators.required, urlValidator()]],
  });

  get productFormControl() {
    return this.productForm.controls;
  }

  onSubmit() {
    if (this.isEditing && this.productId) {
      this.shop
        .updateProduct(this.productId, this.productForm.value as Product)
        .subscribe({
          next: () => this.router.navigate(['/shop']),
          error: (err: Error) => console.error('Observer got an error: ' + err),
        });
    } else {
      this.shop.createProduct(this.productForm.value as Product).subscribe({
        next: () => this.router.navigate(['/shop']),
        error: (err: Error) => console.error('Observer got an error: ' + err),
      });
    }
  }

  loadProductDetails(id: string) {
    this.shop.getProduct(id).subscribe((product) => {
      this.productForm.patchValue(product);
      if (product.discount) {
        this.discountFieldIsDisplayed = true;
      }
    });
  }

  onDeleteItem() {
    if (this.productId)
      this.shop.deleteProduct(this.productId).subscribe({
        next: () => this.router.navigate(['/shop']),
        error: (err: Error) => console.error('Observer got an error: ' + err),
      });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditing = true;
        this.productId = id;
        this.loadProductDetails(this.productId);
      }
    });
  }
}
