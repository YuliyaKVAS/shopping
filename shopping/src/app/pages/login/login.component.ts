import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Store} from "@ngxs/store";
import {Login} from "../../store/actions/auth.actions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(private router: Router, private store: Store) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required, Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required
      ])
    });
  }

  submit() {
    const user = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    // this.authService.login(user).subscribe(() => {
    //   console.log('Login')
    // })

    this.store.dispatch(new Login(user)).subscribe(() => {
      console.log('Login');
      this.router.navigate(['/home']);
    })
  }
}
