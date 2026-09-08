import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mainlayoutcomponent } from './mainlayoutcomponent';

describe('Mainlayoutcomponent', () => {
  let component: Mainlayoutcomponent;
  let fixture: ComponentFixture<Mainlayoutcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mainlayoutcomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Mainlayoutcomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
