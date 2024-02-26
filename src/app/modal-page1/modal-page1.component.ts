import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-page1',
  templateUrl: './modal-page1.component.html',
  styleUrls: ['./modal-page1.component.scss'],
})
export class ModalPage1Component implements OnInit {

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    // Lógica de inicialización si es necesario
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
