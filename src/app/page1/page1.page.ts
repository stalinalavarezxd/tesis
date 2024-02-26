// page1.page.ts
import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service'; // Asegúrate de especificar la ruta correcta

@Component({
  selector: 'app-page1',
  templateUrl: './page1.page.html',
  styleUrls: ['./page1.page.scss'],
})
export class Page1Page implements OnInit {

  constructor(private modalService: ModalService) {}

  ngOnInit() {
  }

  openModalPage1() {
    this.modalService.openModalPage1();
  }
}
