// FlaskApiService.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlaskApiService {
  private apiUrl = 'http://192.168.0.106:4000'; // Reemplaza con la URL de tu API Flask

  constructor(private http: HttpClient) {}

  detectObjects(file: File, isVideo: boolean = false): Promise<any> {
    const formData = new FormData();

    if (isVideo) {
      formData.append('is_video', 'true');
      formData.append('video_file', file, 'video_file');
    } else {
      formData.append('image_file', file, 'image_file');
    }

    return this.http.post(`${this.apiUrl}/detect`, formData).toPromise();
  }
}
