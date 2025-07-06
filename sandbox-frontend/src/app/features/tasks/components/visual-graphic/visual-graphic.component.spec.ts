import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualGraphicComponent } from './visual-graphic.component';

describe('VisualGraphicComponent', () => {
  let component: VisualGraphicComponent;
  let fixture: ComponentFixture<VisualGraphicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualGraphicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
