import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginForm } from './interfaces/login.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  form;

  constructor(
    private formBuilder : FormBuilder,
    private authService : AuthService
  ) {
    this.form = this.formBuilder.group<LoginForm>({
      email: this.formBuilder.nonNullable.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.nonNullable.control('', Validators.required)
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value);
    const { email, password } = this.form.getRawValue();
    this.authService.signUp(email, password).subscribe({
      next: (response) => {
        console.log('response', response);
      },
      error: (error) => {
        console.log('Sign up error', error);
      }
    });
  }
}