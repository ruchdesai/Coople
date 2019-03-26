import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss']
})
export class UserAddEditComponent implements OnInit {

  @Input()
  set content(value: any) {
    if (value) {
      this._content = value;
      for (const user of this.users) {
        if (user.id === this._content) {
          this.userData = user;
          this.generateForm();
        }
      }
    }
  }
  _content: any;
  userData: any;
  userForm: FormGroup;
  submitted: boolean = false;
  selectedUserCountry: any;
  users: any = environment.USERS;
  countries: any = environment.COUNTRIES;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.generateForm();
  }

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  generateForm() {
    this.selectedUserCountry = this.userData ? this.userData.address.country : '';
    this.userForm = this._fb.group({
      name: [this.userData ? this.userData.name : '', Validators.required],
      address: this._fb.group({
        zip: [this.userData ? this.userData.address.zip : '', Validators.required],
        country: [this.selectedUserCountry, Validators.required]
      })
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      console.log('FAILURE!!');
      return;
    }
    const userUpdatedValues: any = this.userForm.value;
    if (userUpdatedValues.id === undefined) {
      userUpdatedValues['id'] = this.users.length + 1;
      this.users.push(userUpdatedValues);
    }
    for (const user of this.users) {
      if (user.id === this._content) {
        user['name'] = userUpdatedValues.name;
        user['address'] = userUpdatedValues.address;
      }
    }
    console.log('SUCCESS!!\n' + JSON.stringify(userUpdatedValues));
  }
}
