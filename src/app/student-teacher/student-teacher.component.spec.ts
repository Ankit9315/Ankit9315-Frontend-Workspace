import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTeacherComponent } from './student-teacher.component';

describe('StudentTeacherComponent', () => {
  let component: StudentTeacherComponent;
  let fixture: ComponentFixture<StudentTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentTeacherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
