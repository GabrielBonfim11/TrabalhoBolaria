import { Component, OnInit } from '@angular/core';
import { Bolo } from '../../interfaces/bolo';
import { ListaBolosService } from 'src/app/services/lista-bolos.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    listBolo: Bolo[];

  constructor(private listBoloService: ListaBolosService, private navController: NavController) { 
    this.listBoloService.getBolosFirebase().subscribe((bolos) => {
      console.log(bolos);
      this.listBolo = bolos;
    });
  }

  ngOnInit() {
  }

  carrinho() {
    this.navController.navigateForward(['carrinho']);
  }

}
