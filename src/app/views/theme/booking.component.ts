import { Component, OnInit } from "@angular/core";
import { AppServiceService } from "./../../app-service.service";
import { BookingUpdateService } from "./../booking-update/booking-update.service";
import { ToastrService } from "ngx-toastr";

@Component({
  templateUrl: "booking.component.html",
})
export class BookingComponent implements OnInit {
  users: getAllUsers;
  error: string;
  constructor(
    private appService: AppServiceService, // private confirmationDialogService: BookingUpdateService
    private confirmationDialogService: BookingUpdateService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.appService.getBooking().subscribe(
      (data: getAllUsers) => (this.users = data["data"]),
      (error) => (this.error = error)
    );
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
