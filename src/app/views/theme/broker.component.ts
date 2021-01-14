import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './../../app-service.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'broker.component.html'
})
export class BrokerComponent implements OnInit {

  users: getAllUsers;
  error: string;
  constructor(
    private appService: AppServiceService,
    private router: Router
  ) { }

  
  ngOnInit(): void {
    this.appService.getAllBroker().subscribe(
      (data: getAllUsers) => this.users = data["data"],
      error => this.error = error
    );
  }

  addUsers(){
    this.router.navigate(['theme/addusers']);
  }

}

interface getAllUsers {
  id: number;
  name: string;
  email: string;
  roll_id: string;
  status: string;
}