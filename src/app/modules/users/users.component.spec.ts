import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UsersComponent } from './users.component';
import { UserAddEditComponent } from './components/user-add-edit/user-add-edit.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { FormatAddressPipe } from '../../pipes/format-address.pipe';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, ReactiveFormsModule, FormsModule ],
      declarations: [ UsersComponent, UserAddEditComponent, UserListComponent, FormatAddressPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
