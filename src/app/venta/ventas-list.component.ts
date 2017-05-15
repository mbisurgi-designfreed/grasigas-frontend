import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable } from 'angularfire2/database';
import * as moment from 'moment';

import { VentasService } from '../shared/venta.service';

@Component({
  selector: 'app-ventas-list',
  templateUrl: './ventas-list.component.html',
  styleUrls: ['./ventas-list.component.css']
})
export class VentasListComponent implements OnInit {

  ventas: FirebaseListObservable<any[]>;

  constructor(private auth: AngularFireAuth, private router: Router, private ventasService: VentasService) { }

  ngOnInit() {
    this.auth.authState.subscribe(auth => {
      if (!auth) {
        this.router.navigate(['login']);
      }
    });
  }

  onBuscar(desde, hasta) {
    console.log(this.ventas);

    const fechaDesde = new Date(desde.value);
    const fechaDesdeSinc = new Date(fechaDesde.getTime() + Math.abs(fechaDesde.getTimezoneOffset() * 60000));

    const fechaHasta = new Date(hasta.value);
    const fechaHastaSinc = new Date(fechaHasta.getTime() + Math.abs(fechaHasta.getTimezoneOffset() * 60000));

    const paramFechaDesde = moment(fechaDesdeSinc).format('DD/MM/YYYY');
    const paramFechaHasta = moment(fechaHastaSinc).format('DD/MM/YYYY');

    this.ventas = this.ventasService.getVentasByRangoFecha(paramFechaDesde, paramFechaHasta);

    console.log(this.ventas);
  }

  onCancelar(desde, hasta) {
    (<HTMLInputElement>desde).value = null;
    (<HTMLInputElement>hasta).value = null;

    this.ventas = this.ventasService.getVentasByRangoFecha('', '');
    this.router.navigate(['ventas']);
  }

}
