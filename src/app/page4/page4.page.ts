import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-page4',
  templateUrl: './page4.page.html',
  styleUrls: ['./page4.page.scss'],
})
export class Page4Page implements OnInit {

  constructor(private modalService: ModalService) {}

  ngOnInit() {
  }

  openManualTransitoModal() {
    this.modalService.openManualTransitoModal();
  }
  
}
