import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of } from 'rxjs/internal/observable/of';

import { UserAddEditComponent } from './user-add-edit.component';
import { UserService } from '../../user-service/user-service.service';

describe('UserAddEditComponent', () => {
  let component: UserAddEditComponent;
  let fixture: ComponentFixture<UserAddEditComponent>;

  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, ReactiveFormsModule ],
      declarations: [ UserAddEditComponent ],
      providers: [ UserService,
        { provide: FormBuilder, useValue: formBuilder }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddEditComponent);
    component = fixture.componentInstance;
    component.userForm = formBuilder.group({
      name: null,
      address: formBuilder.group({
        zip: null,
        country: null
      })
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onReset()', () => {
    component.onReset();
  });

  it('should call onSubmit()', () => {
    component.onSubmit();
  });
});
