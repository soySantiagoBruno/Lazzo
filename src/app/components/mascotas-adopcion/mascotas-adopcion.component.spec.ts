import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotasAdopcionComponent } from './mascotas-adopcion.component';

describe('MascotasAdopcionComponent', () => {
  let component: MascotasAdopcionComponent;
  let fixture: ComponentFixture<MascotasAdopcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MascotasAdopcionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MascotasAdopcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
