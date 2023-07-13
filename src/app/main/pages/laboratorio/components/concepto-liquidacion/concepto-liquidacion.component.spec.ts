import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptoLiquidacionComponent } from './concepto-liquidacion.component';

describe('ConceptoLiquidacionComponent', () => {
  let component: ConceptoLiquidacionComponent;
  let fixture: ComponentFixture<ConceptoLiquidacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptoLiquidacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptoLiquidacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
