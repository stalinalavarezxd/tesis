import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImageDetailPage } from '../image-detail/image-detail.page';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-page3',
  templateUrl: 'page3.page.html',
  styleUrls: ['page3.page.scss'],
})
export class Page3Page implements OnInit {
  data: any;
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  constructor(private http: HttpClient, private modalController: ModalController) {}
  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const apiUrl = 'https://us-central1-swtesis-e0343.cloudfunctions.net/app/api/seniales';
    this.http.get(apiUrl).subscribe((response: any) => {
      if (Array.isArray(response)) {
        const groupedData = this.groupBy(response, 'id_clase');
        this.data = groupedData;
        console.log(this.data); 
      } else {
        console.error('La respuesta no es un array:', response);
      }
    });
  }
  
  async showImageDetail(item: any) {
    const modal = await this.modalController.create({
      component: ImageDetailPage,
      componentProps: {
        image: item.imagen,
        name: item.nombre,
        description: item.descripcion
      }
    });

    return await modal.present();
  }
  groupBy(array: any[], key: string) {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
      return result;
    }, {});
  }
}
