// your-help-modal.component.ts
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-your-help-modal',
  templateUrl: './your-help-modal.component.html',
  styleUrls: ['./your-help-modal.component.scss'],
})
export class YourHelpModalComponent {

  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss();
  }
}
