import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
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
  email = '';
  password = '';
  errorMessage: string | null = null;

  constructor(
    private userService: AuthDataService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  authForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  get authFormControl() {
    return this.authForm.controls;
  }

  onSubmit() {
    const obs$ = this.isLoginMode
      ? this.userService.signin(this.authForm.value as User)
      : this.userService.signup(this.authForm.value as User);

    obs$.subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token);
        this.errorMessage = null;
        this.router.navigate(['/shop']);
      },
      error: (error: any) => {
        this.errorMessage = error.error.message;
        console.log(error);
      },
    });
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.authForm.reset();
  }
}
