import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-booking-update",
  templateUrl: "./booking-update.component.html",
  styleUrls: ["./confirmation-dialog.component.css"],
})
export class BookingUpdateComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit() {}

  public decline() {
    this.activeModal.close({ status: false });
  }

  public accept() {
    // console.log("wwwwwwwwwwwwwwww");
    // console.log(this.message);
    this.activeModal.close({ status: true, message: this.message });
  }

  public dismiss() {
    this.activeModal.dismiss();
  }
}
