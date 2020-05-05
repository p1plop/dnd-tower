import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMapUnitComponent } from './edit-map-unit.component';

describe('EditMapUnitComponent', () => {
  let component: EditMapUnitComponent;
  let fixture: ComponentFixture<EditMapUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMapUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMapUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
