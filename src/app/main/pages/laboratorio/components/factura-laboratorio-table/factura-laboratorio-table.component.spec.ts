/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FacturaLaboratorioTableComponent } from './factura-laboratorio-table.component';

describe('FacturaLaboratorioTableComponent', () => {
  let component: FacturaLaboratorioTableComponent;
  let fixture: ComponentFixture<FacturaLaboratorioTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturaLaboratorioTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaLaboratorioTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
