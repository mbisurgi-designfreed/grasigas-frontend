import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
    this.auth.authState.subscribe(auth => {
      if (auth) {
        this.router.navigate(['']);
      }
    });
  }

  onLogin(f: NgForm) {
    const email = f.value.email;
    const password = f.value.password;

    this.auth.auth.signInWithEmailAndPassword(email, password);

    f.reset();
  }
}
