/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AnularResiboCajaComponent } from './anular-resibo-caja.component';

describe('AnularResiboCajaComponent', () => {
  let component: AnularResiboCajaComponent;
  let fixture: ComponentFixture<AnularResiboCajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnularResiboCajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnularResiboCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
