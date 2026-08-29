import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.scss'
})
export class UserAuthComponent {
  showLogin = false;
  authError: string = "";
  signup: string | undefined

  constructor(private user: UserService, private product: ProductService, private router: Router) {
  }
  ngOnInit(): void {
    this.user.userAuthReload();
    this.user.signUpFail.subscribe(() => {
      this.signup = "This email is already taken. Try another."
    })
    this.user.signUpSuccess.subscribe(() => {
      const userStore = localStorage.getItem('users');
      const userId = userStore && JSON.parse(userStore).id;
      if (userId) {
        this.product.mergeLocalCartToRemote(userId);
      }
    })
  }
  signUp(data: any): void {
    this.user.userSignUp(data)

  }
  login(data: any) {
    this.authError = ""
    this.user.userLogin(data).subscribe((result: any) => {
      if (result && result.body && result.body.length) {
        const loggedInUser = result.body[0];
        localStorage.setItem('users', JSON.stringify(loggedInUser));
        this.product.mergeLocalCartToRemote(loggedInUser.id);
        this.router.navigate(['/'],)
      } else {
        this.user.isLoginError.emit(true)
      }
    });
    this.user.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = "Email and Password is Incorrect"
      }
    })



  }
  openLogin() {
    this.showLogin = true
  }
  openSignUp() {
    this.showLogin = false
  }

}

