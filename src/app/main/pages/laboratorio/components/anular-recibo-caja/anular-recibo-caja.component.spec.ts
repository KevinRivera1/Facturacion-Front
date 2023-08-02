/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AnularReciboCajaComponent } from './anular-recibo-caja.component';



describe('AnularReciboCajaComponent', () => {
  let component: AnularReciboCajaComponent;
  let fixture: ComponentFixture<AnularReciboCajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnularReciboCajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnularReciboCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
