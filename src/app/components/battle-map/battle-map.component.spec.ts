import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleMapComponent } from './battle-map.component';

describe('BattleMapComponent', () => {
  let component: BattleMapComponent;
  let fixture: ComponentFixture<BattleMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattleMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
