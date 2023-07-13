import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CretencionTableComponent } from './cretencion-table.component';

describe('CretencionTableComponent', () => {
  let component: CretencionTableComponent;
  let fixture: ComponentFixture<CretencionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CretencionTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CretencionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
