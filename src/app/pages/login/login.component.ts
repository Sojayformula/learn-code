// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormsModule, NgForm } from '@angular/forms';
// import { AuthServiceService } from '../../services/auth-service.service';

// import { FormBuilder, FormGroup, Validators } from '@angular/forms';


// @Component({
//   selector: 'app-login',
//   imports: [FormsModule, CommonModule],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.scss'
// })
// export class LoginComponent implements OnInit{


//    password: string = '';
//   email: string = '';
//   isLoading: boolean = false;
// errorMessage: string = '';

//   loginForm!: FormGroup;



//   // constructor(private authService: AuthServiceService){}
//   constructor(private fb: FormBuilder, private authService: AuthServiceService) {}


//   ngOnInit(): void {
//       this.loginForm = this.fb.group({
//     username: ['', Validators.required],
//     password: ['', Validators.required]
//   });
//   }


// submitForm(item: NgForm) {
//   const payload = {
//     username: this.loginForm.value.username,
//     password: this.loginForm.value.password
//   };

//   this.isLoading = true;

//   this.authService.login(payload).subscribe({
//     next: (response) => {
//       console.log('success', response.token);
//       localStorage.setItem('token', response.token);

//       this.isLoading = false;
//     },

//     error: (err) => {
//       if (err.status === 401) {
//         this.errorMessage = 'Invalid email or password';
//       } else {
//         this.errorMessage = 'An error occurred. Please try again.';
//       }
//       this.isLoading = false;
//     }
//   });
// }

// }




import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthServiceService, private router: Router) {}

  submitForm(form: NgForm) {
  if (form.invalid) return;

  const payload = {
    email: this.email,
    password: this.password,
  };
  console.log('payload', payload)

this.authService.login({ email: this.email, password: this.password }).subscribe({
  next: (res) => {
    console.log('login data', res)
    localStorage.setItem('token', res.token);
    const token = localStorage.getItem('token')
            console.log('token', token)
    this.router.navigate(['/dashboard']);
  },
  error: (err) => {
    this.errorMessage = 'Invalid email or password';
  }
});

}

}

