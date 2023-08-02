import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciboCajaTableComponent } from './recibo-caja-table.component';

describe('ReciboCajaTableComponent', () => {
  let component: ReciboCajaTableComponent;
  let fixture: ComponentFixture<ReciboCajaTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReciboCajaTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReciboCajaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
