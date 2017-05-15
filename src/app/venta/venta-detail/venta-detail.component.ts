import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { FirebaseListObservable } from 'angularfire2/database';

import { VentasService } from 'app/shared/venta.service';

@Component({
  selector: 'app-venta-detail',
  templateUrl: './venta-detail.component.html',
  styleUrls: ['./venta-detail.component.css']
})
export class VentaDetailComponent implements OnInit {

  uid: string;
  ventas: FirebaseListObservable<any[]>;

  constructor(private route: ActivatedRoute, private ventasService: VentasService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.uid = params['uid'];
      this.ventas = this.ventasService.getVentasByChofer(params['uid']);
    });
  }

}
