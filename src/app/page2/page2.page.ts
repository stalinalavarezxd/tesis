// page2.page.ts
import { Component, ViewChild, ElementRef } from '@angular/core';
import { FlaskApiService } from './FlaskApiService';

@Component({
  selector: 'app-page2',
  templateUrl: 'page2.page.html',
  styleUrls: ['page2.page.scss'],
})
export class Page2Page {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private video!: HTMLVideoElement;
  private intervalId: any;
  private captureInterval = 2000; 
  private mediaStream!: MediaStream;

  constructor(private flaskApiService: FlaskApiService) {}

  ngOnInit() {
    this.video = document.createElement('video');
    this.setupCamera();
  }

  async setupCamera(): Promise<void> {
    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.video.srcObject = this.mediaStream;
      await this.video.play();
      this.startCapture();
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  }

  startCapture(): void {
    this.intervalId = setInterval(() => {
      this.captureAndDetect();
    }, this.captureInterval);
  }

  async captureAndDetect(): Promise<void> {
    const canvasElement = this.canvas.nativeElement;
    const ctx = canvasElement.getContext('2d');

    canvasElement.width = this.video.videoWidth;
    canvasElement.height = this.video.videoHeight;
    ctx!.drawImage(this.video, 0, 0, canvasElement.width, canvasElement.height);

    const imageData = canvasElement.toDataURL('image/jpeg'); // Obtener datos de la imagen en formato base64

    const blob = this.dataURLtoBlob(imageData);
    const file = new File([blob], 'captured_image.jpg');

    try {
      const boxes = await this.flaskApiService.detectObjects(file);
      this.drawImageAndBoxes(file, boxes);
      console.log('Detection Results:', boxes);
    } catch (error) {
      console.error('Error during detection:', error);
    }
  }

  drawImageAndBoxes(file: File, boxes: any[]): void {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvasElement = this.canvas.nativeElement;
      const ctx = canvasElement.getContext('2d');

      ctx!.drawImage(img, 0, 0);

      ctx!.strokeStyle = '#00FF00';
      ctx!.lineWidth = 3;
      ctx!.font = '18px serif';

      boxes.forEach(([x1, y1, x2, y2, label]) => {
        ctx!.strokeRect(x1, y1, x2 - x1, y2 - y1);
        ctx!.fillStyle = '#00ff00';
        const width = ctx!.measureText(label).width;
        ctx!.fillRect(x1, y1, width + 10, 25);
        ctx!.fillStyle = '#000000';
        ctx!.fillText(label, x1, y1 + 18);
      });
    };
  }

  dataURLtoBlob(dataURL: string): Blob {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
  }

  handleFileInput(event: any): void {

  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    this.mediaStream.getTracks().forEach(track => track.stop());
  }
}
