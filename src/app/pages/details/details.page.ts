import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaBolosService } from 'src/app/services/lista-bolos.service';
import { Bolo } from 'src/app/interfaces/bolo';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  public boloId: number;
  public bolo: Bolo;

  constructor(
    private activatedRoute: ActivatedRoute,
    private listaBolos: ListaBolosService,
    private navController: NavController
  ) {
    this.listaBolos.getBoloIdFirebasae(this.activatedRoute.snapshot.params.id).subscribe((bolo) => {
      this.bolo = bolo;
    })
  }

  ngOnInit() {
  }

  adcionarCarrinho() {
    this.listaBolos.addCarrinho(this.bolo).then(() => {
      this.navController.navigateRoot(['/home']);
    });
  }

}
