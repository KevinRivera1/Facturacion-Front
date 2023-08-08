import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaFactTableComponent } from './lista-fact-table.component';


describe('ListaFactTableComponent', () => {
  let component: ListaFactTableComponent;
  let fixture: ComponentFixture<ListaFactTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaFactTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaFactTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
