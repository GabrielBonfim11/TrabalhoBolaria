import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaBolosService } from 'src/app/services/lista-bolos.service';
import { LoadingController, NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Pedido } from 'src/app/interfaces/pedido';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {
  public pedido: Pedido = {};
  public boloID: number;
  public item: {} = {};
  private loading: any;

  

  constructor(
    private activatedRoute: ActivatedRoute,
    private listaBolos: ListaBolosService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private pedidoService: PedidoService,
    private navCtrl: NavController
  ) {
    this.boloID = this.activatedRoute.snapshot.params['id'] - 1;
  }

  ngOnInit() {
    this.getItem();
  }

  salvaPedido(bolo: string){
    this.presentLoading();

    this.pedido.createdAt = new Date().getTime();
    this.pedido.nomeBolo = bolo;
    try{
    this.pedidoService.addPedido(this.pedido).then(()=>{
      this.navCtrl.navigateRoot('home').then(()=>{
        this.loading.dismiss();
        this.presentToast("Seu pedido já está chegando...");
      });
     
    })
   


    } catch(error){
      this.presentToast('Erro Ao tentar Salvar');
      this.loading.dismiss();
    }
  }

  getItem() {
    console.log(this.boloID);
    this.item = this.listaBolos.getBolos()[this.boloID];
  }

 
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Aguarde, por Favor...'
    });
    await this.loading.present(); 
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({message,
      duration: 2000
    });
    toast.present();
 
  }

}
