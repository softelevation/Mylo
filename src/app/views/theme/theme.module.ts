// Angular
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { AgmCoreModule } from "@agm/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { ColorsComponent } from "./colors.component";
import { UsersComponent } from "./users.component";
import { BrokerComponent } from "./broker.component";
import { BrokermapComponent } from "./brokermap.component";
import { CustomersComponent } from "./customers.component";
import { BookingComponent } from "./booking.component";
import { AddUsersComponent } from "./add-users.component";
import { TypographyComponent } from "./typography.component";

import { ConfirmationDialogComponent } from "./../confirmation-dialog/confirmation-dialog.component";
import { ConfirmationDialogService } from "./../confirmation-dialog/confirmation-dialog.service";
import { BookingUpdateComponent } from "./../booking-update/booking-update.component";
import { BookingUpdateService } from "./../booking-update/booking-update.service";
// Theme Routing
import { ThemeRoutingModule } from "./theme-routing.module";
import { from } from "rxjs";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ThemeRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyB1erXOJ7-_yyd3jYyRYrMh7THiUxpAevU",
      libraries: ["places"],
    }),
    NgbModule,
  ],
  declarations: [
    ColorsComponent,
    UsersComponent,
    BrokerComponent,
    BrokermapComponent,
    CustomersComponent,
    BookingComponent,
    AddUsersComponent,
    ConfirmationDialogComponent,
    BookingUpdateComponent,
    TypographyComponent,
  ],
  providers: [ConfirmationDialogService, BookingUpdateService],
  entryComponents: [ConfirmationDialogComponent, BookingUpdateComponent],
})
export class ThemeModule {}
