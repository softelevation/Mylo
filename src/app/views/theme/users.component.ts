import { Component, OnInit } from "@angular/core";
import { AppServiceService } from "./../../app-service.service";
import { Router } from "@angular/router";
import { ConfirmationDialogService } from "./../confirmation-dialog/confirmation-dialog.service";
import { ManageData } from "./manage-data";
import { ToastrService } from "ngx-toastr";

@Component({
  templateUrl: "users.component.html",
})
export class UsersComponent implements OnInit {
  users: getAllUsers;
  users_count: number;
  next_count: number;
  ids: number;
  previews_count: number;
  users_count_1 = [];
  error: string;
  constructor(
    private appService: AppServiceService,
    private confirmationDialogService: ConfirmationDialogService,
    private router: Router,
    private manageData: ManageData,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.appService.getAllUsers().subscribe((data: getAllUsers) => {
      this.ids = 0;
      this.users = data["data"];
      this.paginate_custom(data["message"], 0);
    });
  }

  paginate_custom(input, set) {
    this.users_count_1 = [];
    this.next_count = set + 1;
    this.previews_count = set - 1;
    this.users_count = Math.ceil(input / 10);
    for (let i = 0; i < this.users_count; i++) {
      if (set == i) {
        this.users_count_1.push({
          id: i,
          class: "page-item active",
          name: i + 1,
        });
      } else {
        this.users_count_1.push({ id: i, class: "page-item", name: i + 1 });
      }
    }
  }

  paginate_list(id) {
    let ids = id * 10;
    this.appService
      .filterAllUsers({ limit_to: ids })
      .subscribe((data: getAllUsers) => {
        this.ids = ids;
        this.users = data["data"];
        this.paginate_custom(data["message"], id);
      });
  }

  changeCustomerStatus(id) {
    this.appService
      .deleteData({ id: id, action: "customer_status" })
      .subscribe((res) => {
        this.toastr.success("Customer status change successfully", "Success");
        this.ngOnInit();
      });
  }

  openConfirmationDialog(id) {
    this.confirmationDialogService
      .confirm("Please confirm..", "Do you really want to delete this... ?")
      .then((confirmed) => {
        if (confirmed) {
          this.manageData.transform(this.users, id);
          this.appService
            .deleteData({ id: id, action: "customer" })
            .subscribe((res) => {
              this.toastr.success("Customer delete successfully", "Success");
            });
        }
      })
      .catch(() =>
        console.log(
          "User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)"
        )
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
