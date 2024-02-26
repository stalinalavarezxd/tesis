// page2.page.ts
import { Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FlaskApiService } from './FlaskApiService';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-page2',
  templateUrl: 'page2.page.html',
  styleUrls: ['page2.page.scss'],
})
export class Page2Page implements OnDestroy {
  @ViewChild('video', { static: true }) video!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private intervalId: any;
  private captureInterval = 100;
  private mediaStream!: MediaStream;
  public detectionResults: any[] = [];
  private lastDrawnBoxes: any[] = [];
  private apiUrl = 'https://us-central1-backend-reconocimiento.cloudfunctions.net/app/modelos';
  public detectedObjectInfo: any = null;
  //private currentCamera = 'user';
  private currentCamera = 'environment'; // 'environment' para cámara trasera, 'user' para cámara frontal
  public currentCameraIcon = 'camera-reverse'; 
  constructor(
    private flaskApiService: FlaskApiService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.setupCamera();
  }
  toggleCamera(): void {
    this.currentCamera = this.currentCamera === 'environment' ? 'user' : 'environment';
    this.currentCameraIcon = this.currentCamera === 'environment' ? 'camera-reverse' : 'camera';
    this.setupCamera();
  }
  setupCamera(): void {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: this.currentCamera } })
      .then((stream) => {
        this.mediaStream = stream;
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
        this.startCapture();
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
      });
  }


  startCapture(): void {
    this.intervalId = setInterval(() => {
      this.captureAndDetect();
    }, this.captureInterval);
  }

  async captureAndDetect(): Promise<void> {
    const canvasElement = this.canvas.nativeElement;
    const ctx = canvasElement.getContext('2d');

    canvasElement.width = this.video.nativeElement.videoWidth;
    canvasElement.height = this.video.nativeElement.videoHeight;

    // Dibujar la imagen de la cámara en el canvas
    ctx!.drawImage(
      this.video.nativeElement,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    const imageData = canvasElement.toDataURL('image/jpeg');
    const blob = this.dataURLtoBlob(imageData);
    const file = new File([blob], 'captured_image.jpg');

    try {
      const boxes = await this.flaskApiService.detectObjects(file);

      if (boxes.length > 0 || this.detectionResults.length > 0) {
        // Solo actualizar la detección si hay nuevos resultados o si hay resultados anteriores
        this.detectionResults = boxes;
        this.detectObjectInfo();
        this.drawImageAndBoxes();
        console.log('Detection Results:', boxes);
      }
    } catch (error) {
      console.error('Error during detection:', error);
    }
  }

  async detectObjectInfo(): Promise<void> {
    if (this.detectionResults.length > 0) {
      const detectedLabel = this.detectionResults[0][4]; // Obtener el label del primer resultado

      try {
        const apiResponse = await this.http.get<any[]>(this.apiUrl).toPromise();
        const matchingObject = apiResponse!.find((obj) => obj.name === detectedLabel);

        if (matchingObject) {
          this.detectedObjectInfo = matchingObject;
        } else {
          this.detectedObjectInfo = null;
        }
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
      
    }
    
  }

  drawImageAndBoxes(): void {
    const canvasElement = this.canvas.nativeElement;
    const ctx = canvasElement.getContext('2d');

    // Limpiar el canvas
    ctx!.clearRect(0, 0, canvasElement.width, canvasElement.height);

    // Dibujar la imagen de la cámara en el canvas
    ctx!.drawImage(
      this.video.nativeElement,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );
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

   ngOnDestroy() {
    clearInterval(this.intervalId);

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
    }
  }
}
