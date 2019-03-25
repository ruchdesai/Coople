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
      const users = environment.USERS;
      for (const user of users) {
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
  countries: any = environment.COUNTRIES;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.generateForm();
  }

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  generateForm() {
    this.userForm = this._fb.group({
      name: [this.userData ? this.userData.name : '', Validators.required],
      address: this._fb.group({
        zip: [this.userData ? this.userData.address.zip : '', Validators.required],
        country: ['', Validators.required]
      })
    });
    this.selectedUserCountry = this.userData ? this.userData.address.country : '';
  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      console.log('FAILURE!!');
      return;
    }
    console.log('SUCCESS!!\n' + JSON.stringify(this.userForm.value));
  }
}
