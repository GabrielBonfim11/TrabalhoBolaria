import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Pedido } from '../interfaces/pedido';
import { map } from 'rxjs/operators';
import { PromiseState } from 'q';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private pedidosCollection: AngularFirestoreCollection<Pedido>;

  constructor(private afs: AngularFirestore) {
    this.pedidosCollection = this.afs.collection<Pedido>('Pedidos');
   }

   addPedido(Pedido: Pedido): Promise<Pedido>{
    return this.pedidosCollection.add(Pedido);
   }

   getPedido(){
    return this.pedidosCollection.snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return{ id, ...data};
        })
      })
    )
   }
}
