/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NotaCreditoComponent } from './nota-credito.component';

describe('NotaCreditoComponent', () => {
  let component: NotaCreditoComponent;
  let fixture: ComponentFixture<NotaCreditoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotaCreditoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
