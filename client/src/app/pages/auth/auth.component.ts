import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  NonNullableFormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/data-services/models/user.view.model';
import { AuthDataService } from 'src/app/shared/data-services/services/auth.data.service';
import { InputComponent } from 'src/app/ui-components/input/input.component';

@Component({
  standalone: true,
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputComponent],
})
export class AuthComponent {
  isLoginMode = true;

  defaultState: User = {
    email: '',
    password: '',
  };

  constructor(
    private userService: AuthDataService,
    private router: Router,
    private fb: NonNullableFormBuilder
  ) {}

  authForm = this.fb.group({
    email: [this.defaultState.email, [Validators.required, Validators.email]],
    password: [this.defaultState.password, [Validators.required]],
  });

  get authFormControl() {
    return this.authForm.controls;
  }

  onSubmit() {
    const formValue: User = this.authForm.getRawValue();

    const auth$ = this.isLoginMode
      ? this.userService.signin(formValue)
      : this.userService.signup(formValue);

    auth$.subscribe({
      next: () => {
        this.router.navigate(['/shop']);
      },
    });
    this.authForm.reset(this.defaultState);
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.authForm.reset(this.defaultState);
  }
}
