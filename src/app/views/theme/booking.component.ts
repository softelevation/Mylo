import { Component, OnInit } from "@angular/core";
import { AppServiceService } from "./../../app-service.service";
import { BookingUpdateService } from "./../booking-update/booking-update.service";
import { ToastrService } from "ngx-toastr";

@Component({
  templateUrl: "booking.component.html",
})
export class BookingComponent implements OnInit {
  users: getAllUsers;
  upcoming_user: getAllUsers;
  completed_user: getAllUsers;
  secondary_button_class = "btn btn-secondary waves-effect waves-light";
  success_button_class = "btn btn-success waves-effect waves-light";
  error: string;
  list_title = "Up coming data";
  constructor(
    private appService: AppServiceService, // private confirmationDialogService: BookingUpdateService
    private confirmationDialogService: BookingUpdateService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.appService.getBooking().subscribe((data: getAllUsers) => {
      this.users = data["data"].upcoming;
      this.upcoming_user = data["data"].upcoming;
      this.completed_user = data["data"].completed;
    });
  }

  upComingList() {
    this.list_title = "Up coming data";
    this.users = this.upcoming_user;
    this.secondary_button_class = "btn btn-secondary waves-effect waves-light";
    this.success_button_class = "btn btn-success waves-effect waves-light";
  }

  completedList() {
    this.list_title = "Completed data";
    this.users = this.completed_user;
    this.secondary_button_class = "btn btn-success waves-effect waves-light";
    this.success_button_class = "btn btn-secondary waves-effect waves-light";
  }

  editBooking(id) {
    let selectedUser = this.users[id].created_at;
    let booking_id = this.users[id].id;
    this.confirmationDialogService
      .confirm("Change booking", selectedUser)
      .then((confirmed) => {
        let booking_change = {
          book_id: booking_id,
          input_date: confirmed.input_date,
          input_time: confirmed.input_time,
        };
        this.appService.updateBooking(booking_change).subscribe((res) => {
          if (res.status) {
            let res_message =
              res.message.charAt(0).toUpperCase() + res.message.slice(1);
            this.toastr.success(res_message, "Success");
            this.ngOnInit();
          }
        });
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
  phone_no: string;
  image: string;
  address: string;
  status: string;
  created_at: string;
  updated_at: string;
}
