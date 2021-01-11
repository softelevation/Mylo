import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppServiceService } from './../../app-service.service';

@Component({
  templateUrl: 'add-users.component.html'
})
export class AddUsersComponent implements OnInit {

  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private appService: AppServiceService
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      roll_id: ['', Validators.required]
    });
  }

  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';

  addUser() {

    let obj = {
      name : this.userForm.get('name').value,
      email : this.userForm.get('email').value,
      password : this.userForm.get('password').value,
      roll_id : this.userForm.get('roll_id').value
    }

    this.appService.addUsers(obj).subscribe(data => {
          this.router.navigate(['theme/users']);
      });
  }

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }

}