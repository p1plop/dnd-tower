import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSpellComponent } from './view-spell.component';

describe('ViewSpellComponent', () => {
  let component: ViewSpellComponent;
  let fixture: ComponentFixture<ViewSpellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSpellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSpellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
