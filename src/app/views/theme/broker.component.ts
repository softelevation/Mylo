import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './../../app-service.service';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from './../confirmation-dialog/confirmation-dialog.service';
import { ManageData } from './manage-data';

@Component({
  templateUrl: 'broker.component.html'
})
export class BrokerComponent implements OnInit {

  users: getAllUsers;
  users_count: number;
  next_count: number;
  previews_count: number;
  users_count_1 = [];
  error: string;
  constructor(
    private appService: AppServiceService,
    private confirmationDialogService: ConfirmationDialogService,
    private router: Router,
    private manageData: ManageData
  ) { }

  
  ngOnInit(): void {
    this.appService.getAllBroker().subscribe(
      (data: getAllUsers) => {
        this.users = data["data"];
        this.paginate_custom(data["message"],0);
      });
  }

  paginate_custom(input,set){
    this.users_count_1 = [];
    this.next_count = set + 1;
    this.previews_count = set - 1;
    this.users_count = Math.ceil(input/10);
    for (let i = 0; i < this.users_count; i++) {
      if(set == i){
        this.users_count_1.push({id:i,class:"page-item active",name:i+1});
      }else{
        this.users_count_1.push({id:i,class:"page-item",name:i+1});
      }
    }
}

paginate_list(id){
  let ids = id*10;
  this.appService.filterAllBrokers({limit_to:ids}).subscribe(
    (data: getAllUsers) => {
      this.users = data["data"];
      this.paginate_custom(data["message"],id);
    });
}

  addUsers(){
    this.router.navigate(['addusers']);
  }

  editBroker(id){
    window.location.assign('#/addusers?broker_id='+id);
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