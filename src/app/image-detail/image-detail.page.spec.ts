import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageDetailPage } from './image-detail.page';

describe('ImageDetailPage', () => {
  let component: ImageDetailPage;
  let fixture: ComponentFixture<ImageDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ImageDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
