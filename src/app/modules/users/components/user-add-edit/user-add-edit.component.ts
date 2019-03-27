import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import { UserService } from '../../user-service/user-service.service';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss']
})
export class UserAddEditComponent implements OnInit {

  @Input()
  set content(value: any) {
    if (value) {
      this.compContent = value;
      for (const user of this.users) {
        if (user.id === this.compContent) {
          this.userData = user;
          this.generateForm();
        }
      }
    }
  }
  compContent: any;
  userData: any;
  userForm: FormGroup;
  submitted = false;
  users: any = environment.USERS;
  countries: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getCountries().subscribe((data) => {
      this.countries = data;
    });
    this.generateForm();
  }

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  generateForm() {
    this.userForm = this.formBuilder.group({
      name: [this.userData ? this.userData.name : '', Validators.required],
      address: this.formBuilder.group({
        zip: [this.userData ? this.userData.address.zip : '', [
          Validators.required,
          Validators.pattern(/^ABC/),
          Validators.minLength(5),
          Validators.maxLength(5)
        ]],
        country: [this.userData ? this.userData.address.country : '', Validators.required]
      })
    });
  }

  onReset() {
    this.userForm.reset();
    this.compContent = '';
    this.submitted = false;
  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      console.log('FAILURE - Incomplete form submitted.');
      return;
    }
    const userUpdatedValues: any = this.userForm.value;
    if (this.compContent) {
      for (const user of this.users) {
        if (user.id === this.compContent) {
          user.name = userUpdatedValues.name;
          user.address = userUpdatedValues.address;
          this.onReset();
        }
      }
    } else {
      userUpdatedValues.id = this.users.length + 1;
      this.users.push(userUpdatedValues);
      this.onReset();
    }
  }
}
