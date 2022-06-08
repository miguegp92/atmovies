import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesActionComponent } from './movies-action.component';

describe('MoviesActionComponent', () => {
  let component: MoviesActionComponent;
  let fixture: ComponentFixture<MoviesActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
