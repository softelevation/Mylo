import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './../../app-service.service';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from './../confirmation-dialog/confirmation-dialog.service';
import { ManageData } from './manage-data';

@Component({
  templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit {

  users: getAllUsers;
  error: string;
  constructor(
    private appService: AppServiceService,
    private confirmationDialogService: ConfirmationDialogService,
    private router: Router,
    private manageData: ManageData
  ) { }

  
  ngOnInit(): void {
    this.appService.getAllUsers().subscribe(
      (data: getAllUsers) => this.users = data["data"],
      error => this.error = error
    );
  }

  openConfirmationDialog(id){
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete this... ?')
    .then((confirmed) => {
      if(confirmed){
        this.manageData.transform(this.users,id);
        this.appService.deleteData({id : id,action: 'customer'}).subscribe(res => {
        });
      }
    }).catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
  

}

interface getAllUsers {
  id: number;
  name: string;
  email: string;
  roll_id: string;
  status: string;
}