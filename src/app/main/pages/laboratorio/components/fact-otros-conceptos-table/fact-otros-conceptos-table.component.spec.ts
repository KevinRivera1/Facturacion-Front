/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FactOtrosConceptosTableComponent } from './fact-otros-conceptos-table.component';

describe('FactOtrosConceptosTableComponent', () => {
  let component: FactOtrosConceptosTableComponent;
  let fixture: ComponentFixture<FactOtrosConceptosTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactOtrosConceptosTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactOtrosConceptosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
