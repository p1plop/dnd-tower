import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpellComponent } from './add-spell.component';

describe('AddSpellComponent', () => {
  let component: AddSpellComponent;
  let fixture: ComponentFixture<AddSpellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSpellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSpellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
