import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './../../app-service.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit {

  users: getAllUsers;
  error: string;
  constructor(
    private appService: AppServiceService,
    private router: Router
  ) { }

  
  ngOnInit(): void {
    this.appService.getAllUsers().subscribe(
      (data: getAllUsers) => this.users = data["data"],
      error => this.error = error
    );
  }

  

}

interface getAllUsers {
  id: number;
  name: string;
  email: string;
  roll_id: string;
  status: string;
}