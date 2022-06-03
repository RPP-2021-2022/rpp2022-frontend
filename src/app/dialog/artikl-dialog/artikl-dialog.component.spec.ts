import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtiklDialogComponent } from './artikl-dialog.component';

describe('ArtiklDialogComponent', () => {
  let component: ArtiklDialogComponent;
  let fixture: ComponentFixture<ArtiklDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtiklDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtiklDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
