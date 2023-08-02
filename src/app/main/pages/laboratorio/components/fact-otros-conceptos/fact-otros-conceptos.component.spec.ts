/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FactOtrosConceptosComponent } from './fact-otros-conceptos.component';

describe('FactOtrosConceptosComponent', () => {
  let component: FactOtrosConceptosComponent;
  let fixture: ComponentFixture<FactOtrosConceptosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactOtrosConceptosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactOtrosConceptosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
