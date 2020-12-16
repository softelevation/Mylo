import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './../../app-service.service';

@Component({
  templateUrl: 'broker.component.html'
})
export class BrokerComponent implements OnInit {

  users: getAllUsers;
  error: string;
  constructor(
    private appService: AppServiceService
  ) { }

  
  ngOnInit(): void {
    this.appService.getAllUsers().subscribe(
      (data: getAllUsers) => this.users = data,
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