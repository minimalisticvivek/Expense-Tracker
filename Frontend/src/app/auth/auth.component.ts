import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, SignIn, SignUp, ExpensesService } from 'src/swagger';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  public signupBody: SignUp = {
    name: '',
    email: '',
    isPremium: false,
    password: '',
  };

  public signinBody = {
    email: '',
    password: '',
  };

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    sessionStorage.getItem('token') !== null
      ? this.router.navigateByUrl('/dashboard')
      : null;
  }
  // Sign Up Button Handler
  async signUpUser(): Promise<any> {
    if (this.signupBody.email.indexOf('@') == -1) {
      alert('Enter a Valid Email!');
      return;
    }
    this.authService.signup(this.signupBody).subscribe(
      (response) => {
        if (Array.isArray(response)) {
          alert('You already have an account with us! Please Sign In...');
          this.switchForm();
        } else {
          alert('Sign Up Successful! Please Sign In...');
          this.switchForm();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  private token: string = 'token';

  // Sign In Button Handler
  async signInUser(): Promise<any> {
    if (this.signinBody.email.indexOf('@') == -1) {
      alert('Enter a Valid Email!');
      return;
    }
    this.authService.signin(JSON.stringify(this.signinBody)).subscribe(
      (response) => {
        if (response.code == 0) {
          alert('You are not registered with us! Please Sign Up.');
          this.switchForm();
        } else if (response.code == 1) {
          alert('Sign In Successful!');
          sessionStorage.setItem(this.token, response.token as string);
          this.router.navigateByUrl('/dashboard');
        } else if (response.code == 2) {
          alert('Wrong Password! Please try again...');
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //Toggle SignIn / SignUp Form
  showForm: string = 'SignUp';
  switchForm() {
    this.showForm == 'SignUp'
      ? (this.showForm = 'SignIn')
      : (this.showForm = 'SignUp');
  }
}
