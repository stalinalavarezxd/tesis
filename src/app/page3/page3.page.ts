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
  }// Variable para almacenar los datos de la API

  constructor(private http: HttpClient, private modalController: ModalController) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    // URL de la API
    const apiUrl = 'https://us-central1-swtesis-e0343.cloudfunctions.net/app/api/seniales';
  
    // Realizar la solicitud HTTP
    this.http.get(apiUrl).subscribe((response: any) => {
      // Asegúrate de que response es un array antes de continuar
      if (Array.isArray(response)) {
        // Organizar los datos por id_clase
        const groupedData = this.groupBy(response, 'id_clase');
        this.data = groupedData;
        console.log(this.data); // Puedes eliminar esto, es solo para verificar en la consola
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
  // Función para agrupar los datos por una clave específica
  groupBy(array: any[], key: string) {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
      return result;
    }, {});
  }
}
