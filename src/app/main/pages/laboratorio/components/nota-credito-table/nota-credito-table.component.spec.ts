import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotaCreditoTableComponent } from './nota-credito-table.component';


describe('NotaCreditoTableComponent', () => {
  let component: NotaCreditoTableComponent;
  let fixture: ComponentFixture<NotaCreditoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotaCreditoTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotaCreditoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
