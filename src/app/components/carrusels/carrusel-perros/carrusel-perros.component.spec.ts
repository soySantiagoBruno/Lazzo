import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruselPerrosComponent } from './carrusel-perros.component';

describe('CarruselPerrosComponent', () => {
  let component: CarruselPerrosComponent;
  let fixture: ComponentFixture<CarruselPerrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarruselPerrosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarruselPerrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
