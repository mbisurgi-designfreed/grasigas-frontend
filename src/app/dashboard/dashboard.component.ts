import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ventas: FirebaseListObservable<any[]>;
  fechaDesde: Subject<any>;
  fechaHasta: Subject<any>;

  constructor(private auth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) { }

  ngOnInit() {
    this.auth.authState.subscribe(auth => {
      if (!auth) {
        this.router.navigate(['login']);
      }
    });

    this.fechaDesde = new Subject();
    this.fechaHasta = new Subject();

    this.ventas = this.db.list('ventas', {
      query: {
        orderByChild: 'fecha',
        startAt: this.fechaDesde,
        endAt: this.fechaHasta
      }
    });

    console.log(this.ventas);
  }

  onBuscar(desde, hasta) {
    console.log(desde.value);
    console.log(hasta.value);

    const fechaDesde = new Date(desde.value);
    const fechaDesdeSinc = new Date(fechaDesde.getTime() + Math.abs(fechaDesde.getTimezoneOffset() * 60000));

    const fechaHasta = new Date(hasta.value);
    const fechaHastaSinc = new Date(fechaHasta.getTime() + Math.abs(fechaHasta.getTimezoneOffset() * 60000));

    this.fechaDesde.next(moment(fechaDesdeSinc).format('DD/MM/YYYY'));
    this.fechaHasta.next(moment(fechaHastaSinc).format('DD/MM/YYYY'));
  }

  onCancelar() {
    this.fechaDesde.next('');
    this.fechaHasta.next('');
  }
}
