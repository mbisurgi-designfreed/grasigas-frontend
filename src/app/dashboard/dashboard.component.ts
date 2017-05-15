import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';

import { VentasService } from '../shared/venta.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [VentasService]
})
export class DashboardComponent implements OnInit {

  constructor(private auth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
    this.auth.authState.subscribe(auth => {
      if (!auth) {
        this.router.navigate(['login']);
      }
    });
  }
}
