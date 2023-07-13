import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroCostosTableComponent } from './centro-costos-table.component';

describe('CentroCostosTableComponent', () => {
  let component: CentroCostosTableComponent;
  let fixture: ComponentFixture<CentroCostosTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentroCostosTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentroCostosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
