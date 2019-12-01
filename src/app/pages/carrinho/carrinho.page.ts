import { Component, OnInit } from '@angular/core';
import { Bolo } from 'src/app/interfaces/bolo';
import { ListaBolosService } from 'src/app/services/lista-bolos.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {

  carrinho: Bolo[] = [];

  constructor(private listaBoloService: ListaBolosService, private navController: NavController) {
    this.listaBoloService.getCarrinho().subscribe((carrinho) => {
      this.carrinho = carrinho;
    });
  }

  ngOnInit() {
  }

  confirmar() {
    this.listaBoloService.confirmarPedido(this.carrinho).then(() => {
      this.navController.pop();
    })
  }
}
