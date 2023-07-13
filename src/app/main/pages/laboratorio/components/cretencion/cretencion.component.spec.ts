import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CretencionComponent } from './cretencion.component';

describe('CretencionComponent', () => {
  let component: CretencionComponent;
  let fixture: ComponentFixture<CretencionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CretencionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CretencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
