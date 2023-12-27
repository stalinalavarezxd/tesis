import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.page.html',
  styleUrls: ['./image-detail.page.scss'],
})
export class ImageDetailPage {
  @Input() image!: string;
  @Input() name!: string;
  @Input() description!: string;

  constructor(private modalController: ModalController) {}

  closeModal() {
    this.modalController.dismiss();
  }
}
