import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import { UserService } from '../../user-service/user-service.service';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss']
})
export class UserAddEditComponent implements OnInit {

  userData: any;
  userForm: FormGroup;
  submitted = false;
  users: any = environment.USERS;
  countries: any = environment.COUNTRIES;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.userService.selectedUser$.subscribe((data) => {
      if (data) {
        this.userData = data;
        this.setFormValues();
      }
    });
  }

  ngOnInit() {
    this.generateForm();
  }

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  generateForm() {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: this.formBuilder.group({
        zip: ['', [
          Validators.required,
          Validators.pattern(/^ABC/),
          Validators.minLength(5),
          Validators.maxLength(5)
        ]],
        country: ['', Validators.required]
      })
    });
  }

  setFormValues() {
    this.f.name.setValue(this.userData.name);
    this.f.address.setValue(this.userData.address);
  }

  onReset() {
    this.userForm.reset();
    this.userData = '';
    this.submitted = false;
  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      console.log('FAILURE - Incomplete form submitted.');
      return;
    }
    const userUpdatedValues: any = this.userForm.value;
    if (this.userData) {
      for (const user of this.users) {
        if (user.id === this.userData.id) {
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
