import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { UserAddEditComponent } from './user-add-edit.component';
import { UserService } from '../../user-service/user-service.service';
import { of } from 'rxjs';

const MockUserData = {
  id: 1, name: 'Ruchit Desai', address: { zip: 'ABC12', country: 'India' }
};

const MockUsers = [
  { id: 1, name: 'Ruchit Desai', address: { zip: 'ABC12', country: 'India' } },
  { id: 2, name: 'Suchit Desai', address: { zip: 'ABC11', country: 'India' } }
];

describe('UserAddEditComponent', () => {
  let userService: UserService;
  let component: UserAddEditComponent;
  let fixture: ComponentFixture<UserAddEditComponent>;

  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, ReactiveFormsModule, FormsModule ],
      declarations: [ UserAddEditComponent ],
      providers: [ UserService, { provide: FormBuilder, useValue: formBuilder }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    userService = TestBed.get(UserService);
    fixture = TestBed.createComponent(UserAddEditComponent);
    component = fixture.componentInstance;
    component.userData = MockUserData;
    component.users = MockUsers;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should call generateForm()', async(() => {
    spyOn(component, 'generateForm').and.callThrough();
    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(component.generateForm).toHaveBeenCalled();
    });
  }));

  it('should call setFormValues()', async(() => {
    spyOn(component, 'setFormValues').and.callThrough();
    component.userForm.controls['name'].setValue(MockUserData.name);
    component.userForm.controls['address'].setValue(MockUserData.address);
    component.setFormValues();
    fixture.whenStable().then(() => {
      expect(component.setFormValues).toHaveBeenCalled();
      expect(component.userForm.controls['name'].value).toBe('Ruchit Desai');
      expect(component.userForm.controls['address'].value).toEqual({zip: 'ABC12', country: 'India'});
    });
  }));

  it('should call onReset()', async(() => {
    spyOn(component, 'onReset').and.callThrough();
    component.onReset();
    fixture.whenStable().then(() => {
      expect(component.onReset).toHaveBeenCalled();
      expect(component.userData).toBe('');
      expect(component.submitted).toBeFalsy();
    });
  }));

  it('should call onSubmit() with user form invalid', async(() => {
    spyOn(component, 'onSubmit').and.callThrough();
    component.onSubmit();
    fixture.whenStable().then(() => {
      expect(component.onSubmit).toHaveBeenCalled();
    });
  }));

  it('should call onReset() on onSubmit() call when user form valid and userData', async(() => {
    spyOn(component, 'onReset').and.callThrough();
    component.userForm.controls['name'].setValue('Ruchit Desai');
    component.userForm.controls['address'].setValue({zip: 'ABC12', country: 'India'});
    component.onSubmit();
    fixture.whenStable().then(() => {
      expect(component.onReset).toHaveBeenCalled();
    });
  }));

  it('should call onReset() on onSubmit() call when user form valid and no userData', async(() => {
    spyOn(component, 'onReset').and.callThrough();
    component.userForm.controls['name'].setValue('Ruchit Desai');
    component.userForm.controls['address'].setValue({zip: 'ABC12', country: 'India'});
    component.userData = '';
    component.onSubmit();
    fixture.whenStable().then(() => {
      expect(component.onReset).toHaveBeenCalled();
    });
  }));
});
