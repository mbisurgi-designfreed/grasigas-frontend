import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/operator/map';

import { Venta } from './venta.model';

@Injectable()
export class VentasService {

  constructor(private db: AngularFireDatabase) { }

  getVentas() {
    return this.db.list('ventas');
  }

  getVentasByRangoFecha(desde: string, hasta: string) {
    return <FirebaseListObservable<Venta[]>> this.db.list('ventas', {
      query: {
        orderByChild: 'fecha',
        startAt: desde,
        endAt: hasta
      }
    }).map(items => {
      console.log(items);

      const map = new Map();

      for (const item of items) {
        if (!map.has(item.uid)) {
          map.set(item.uid, item);
        } else {
          const venta: Venta = map.get(item.uid);

          venta.kilos = venta.kilos + item.kilos;
          venta.pesos = venta.pesos + item.pesos;
          venta.ventas = venta.ventas + item.ventas;
          venta.visitas = venta.visitas + item.visitas;
        }
      }

      console.log(Array.from(map.values()));

      return Array.from(map.values());
    });
  }

  getVentasByChofer(uid: string) {
    return <FirebaseListObservable<Venta[]>> this.db.list('ventas', {
      query: {
        orderByChild: 'uid',
        equalTo: uid
      }
    });
  }
}
