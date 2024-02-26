// FlaskApiService.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlaskApiService {
  private apiUrl = 'http://10.52.79.142:4000'; 

  constructor(private http: HttpClient) {}

  detectObjects(file: File, isVideo: boolean = false): Promise<any> {
    const formData = new FormData();

    if (isVideo) {
      formData.append('is_video', 'true');
      formData.append('video_file', file, 'video_file');
    } else {
      formData.append('image_file', file, 'image_file');
    }

    return this.http.post(`${this.apiUrl}/detect`, formData)
      .toPromise()
      .then(response => {
        console.log('Respuesta del servidor:', response); // Imprimir la respuesta en la consola
        return response;
      })
      .catch(error => {
        console.error('Error en la solicitud al servidor:', error);
        throw error; // Re-lanzar el error para que se maneje en el código que llamó a detectObjects
      });
  }
}
