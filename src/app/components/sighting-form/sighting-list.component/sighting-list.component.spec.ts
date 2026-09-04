import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SightingListComponent } from './sighting-list.component';

describe('SightingListComponent', () => {
  let component: SightingListComponent;
  let fixture: ComponentFixture<SightingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SightingListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SightingListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
