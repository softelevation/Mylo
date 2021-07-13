import { Component, OnInit } from "@angular/core";
import { AppServiceService } from "./../../app-service.service";
import { BookingUpdateService } from "./../booking-update/booking-update.service";

@Component({
  templateUrl: "booking.component.html",
})
export class BookingComponent implements OnInit {
  users: getAllUsers;
  error: string;
  constructor(
    private appService: AppServiceService, // private confirmationDialogService: BookingUpdateService
    private confirmationDialogService: BookingUpdateService
  ) {}

  ngOnInit(): void {
    this.appService.getBooking().subscribe(
      (data: getAllUsers) => (this.users = data["data"]),
      (error) => (this.error = error)
    );
  }

  editBooking(id) {
    // console.log(this.users[id]);
    let selectedUser = this.users[id].created_at;
    let booking_id = this.users[id].id;
    this.confirmationDialogService
      .confirm("Change booking", selectedUser)
      .then((confirmed) => {
        let booking_change = {
          book_id: booking_id,
          input_date: confirmed.input_date,
          input_time: confirmed.input_time
        }
          this.appService
            .updateBooking(booking_change)
            .subscribe((res) => {
                if(res.status){
                    this.ngOnInit();
                }
                // console.log(res);
                
            });
      })
      .catch(() =>
        console.log(
          "User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)"
        )
      );
    //
    // console.log(selectedUser);

    // console.log(selectedUser);
    // this.confirmationDialogService
    //   .confirm("Please confirm..", "Do you really want to delete this... ?")
    //   .then((confirmed) => {
    //     if (confirmed) {
    //       console.log(id);
    //       // this.manageData.transform(this.users, id);
    //       // this.appService
    //       //   .deleteData({ id: id, action: "customer" })
    //       //   .subscribe((res) => {});
    //     }
    //   })
    //   .catch(() =>
    //     console.log(
    //       "User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)"
    //     )
    //   );
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
