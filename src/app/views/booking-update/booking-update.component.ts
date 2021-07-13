import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: "app-booking-update",
  templateUrl: "./booking-update.component.html",
  styleUrls: ["./confirmation-dialog.component.css"],
})
export class BookingUpdateComponent implements OnInit {

  pipe = new DatePipe('en-US');
  orderForm: FormGroup;
  order: any;
  @Input() title: string;
  @Input() input_date: string;
  @Input() message: string;
  @Input() input_time: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit() {
    let newDate = new Date(this.message);
    let my_pipe_date = this.pipe.transform(newDate, 'yyyy-MM-dd');
    let my_pipe_time = this.pipe.transform(newDate, 'H:mm');
    this.order = {
      input_date: my_pipe_date,
      input_time: my_pipe_time
    }
  }

  public decline() {
    this.activeModal.close({ status: false });
  }

  public accept() {
    this.input_date = this.order.input_date;
    this.input_time = this.order.input_time;
    this.activeModal.close({ status: true, input_date: this.input_date, input_time: this.input_time });
  }

  public dismiss() {
    this.activeModal.dismiss();
  }
}
