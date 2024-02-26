import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { YourHelpModalComponent } from './your-help-modal/your-help-modal.component';
import { ManualTransitoModalComponent } from './manual-transito-modal/manual-transito-modal.component';
import { ModalPage1Component } from './modal-page1/modal-page1.component';
import { ModalPage2Component } from './modal-page2/modal-page2.component';


@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private modalController: ModalController) {}

  async openHelpModal() {
    const modal = await this.modalController.create({
      component: YourHelpModalComponent,
    });
    return await modal.present();
  }

  async openManualTransitoModal() {
    const modal = await this.modalController.create({
      component: ManualTransitoModalComponent,
    });
    return await modal.present();
  }

 // modal.service.ts
async openModalPage1() {
  const modal = await this.modalController.create({
    component: ModalPage1Component,
  });
  return await modal.present();
}
 // modal.service.ts
 async openModalPage2() {
  const modal = await this.modalController.create({
    component: ModalPage2Component,
  });
  return await modal.present();
}

  async dismiss() {
    await this.modalController.dismiss();
  }
}
