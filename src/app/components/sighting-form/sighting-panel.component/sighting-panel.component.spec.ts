import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SightingPanelComponent } from './sighting-panel.component';

describe('SightingPanelComponent', () => {
  let component: SightingPanelComponent;
  let fixture: ComponentFixture<SightingPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SightingPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SightingPanelComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
