import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptoLiquidacionTableComponent } from './concepto-liquidacion-table.component';

describe('ConceptoLiquidacionTableComponent', () => {
  let component: ConceptoLiquidacionTableComponent;
  let fixture: ComponentFixture<ConceptoLiquidacionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptoLiquidacionTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptoLiquidacionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
