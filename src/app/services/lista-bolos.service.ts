import { Injectable } from '@angular/core';
import { Bolo } from '../interfaces/bolo';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListaBolosService {

  constructor(private afs: AngularFirestore) { }

  getBolos(): Bolo[] {
    const listBolo: Bolo[] = [
      {
        id: 1,
        imagem: '../../assets/imagens/bolo-cenoura.jpg',
        nome: 'Bolo de Cenoura',
        desc: 'Apenas R$18,00'
      },
      {
        id: 2,
        imagem: '../../assets/imagens/bolo-nutella.jpg',
        nome: 'Com Nutella',
        desc: 'Apenas R$29,00'
      },
      {
        id: 3,
        imagem: '../../assets/imagens/bolo-brigadeiro.jpg',
        nome: 'De Brigadeiro',
        desc: 'Apenas R$24,00'
      },
      {
        id: 4,
        imagem: '../../assets/imagens/bolo-açucarado.png',
        nome: 'Açucarado',
        desc: 'Apenas R$19,00'
      }
    ];

    return listBolo;
  }

  getBolosFirebase(): Observable<Bolo[]> {
    return this.afs.collection<Bolo>('bolos').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id_fire = a.payload.doc.id;
          return { id_fire, ...data };
        })
      })
    )
  }

  getCarrinho(): Observable<Bolo[]> {
    return this.afs.collection<Bolo>('carrinho').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id_fire = a.payload.doc.id;
          return { id_fire, ...data };
        })
      })
    )
  }

  getBoloIdFirebasae(id: string): Observable<Bolo | any> {
    return this.afs.collection<Bolo>('bolos').doc(id).snapshotChanges().pipe(
      map(actions => {
        const data = actions.payload.data();
        const id_fire = actions.payload.id;
        return { id_fire, ...data };
      })
    )
  }

  saveFirebase() {
    this.getBolos().forEach((bolo) => {
      this.afs.collection('bolos').add(bolo);
    })
  }

  addCarrinho(bolo: Bolo) {
    return this.afs.collection<Bolo>('carrinho').add(bolo);
  }

  confirmarPedido(carrinho: Bolo[]) {
    return this.afs.collection('pedidos').add({ data: Date.now() }).then((res) => {
      res.collection('bolos').add({ bolos: carrinho });
      carrinho.forEach(bolo => {
        this.afs.collection('carrinho').doc(bolo['id_fire']).delete();
      });
    });
  }
}