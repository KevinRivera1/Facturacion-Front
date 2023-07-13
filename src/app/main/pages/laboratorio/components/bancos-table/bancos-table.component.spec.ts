import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BancosTableComponent } from './bancos-table.component';

describe('BancosTableComponent', () => {
  let component: BancosTableComponent;
  let fixture: ComponentFixture<BancosTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BancosTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BancosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
