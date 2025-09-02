import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArithmeticQuestionComponent } from './arithmetic-question.component';

describe('ArithmeticQuestionComponent', () => {
  let component: ArithmeticQuestionComponent;
  let fixture: ComponentFixture<ArithmeticQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArithmeticQuestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArithmeticQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
