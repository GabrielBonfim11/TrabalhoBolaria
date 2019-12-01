import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/interfaces/pedido';
import { Subscription } from 'rxjs';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.page.html',
  styleUrls: ['./lista-pedidos.page.scss'],
})
export class ListaPedidosPage implements OnInit {
  private pedidos = new Array<Pedido>();
  private pedidosSubscription: Subscription;

  constructor(private pedidoService: PedidoService) {
    this.pedidosSubscription = this.pedidoService.getPedido().subscribe( data => {
      this.pedidos = data;
    })
   }

  ngOnInit() {
  }

}
