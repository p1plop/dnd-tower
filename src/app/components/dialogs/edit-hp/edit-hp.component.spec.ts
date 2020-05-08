import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHpComponent } from './edit-hp.component';

describe('EditHpComponent', () => {
  let component: EditHpComponent;
  let fixture: ComponentFixture<EditHpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
