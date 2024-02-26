import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-manual-transito-modal',
  templateUrl: './manual-transito-modal.component.html',
  styleUrls: ['./manual-transito-modal.component.scss'],
})
export class ManualTransitoModalComponent {

  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss();
  }
}
