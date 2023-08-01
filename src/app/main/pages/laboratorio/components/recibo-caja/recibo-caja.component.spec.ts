import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciboCajaComponent } from './recibo-caja.component';

describe('ReciboCajaComponent', () => {
  let component: ReciboCajaComponent;
  let fixture: ComponentFixture<ReciboCajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReciboCajaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReciboCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
