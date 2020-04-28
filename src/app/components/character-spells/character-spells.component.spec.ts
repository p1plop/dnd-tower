import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSpellsComponent } from './character-spells.component';

describe('CharacterSpellsComponent', () => {
  let component: CharacterSpellsComponent;
  let fixture: ComponentFixture<CharacterSpellsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterSpellsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSpellsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
