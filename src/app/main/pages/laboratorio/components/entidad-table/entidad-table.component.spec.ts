import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntidadTableComponent } from './entidad-table.component';

describe('TipoServicioTableComponent', () => {
  let component: EntidadTableComponent;
  let fixture: ComponentFixture<EntidadTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntidadTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntidadTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
