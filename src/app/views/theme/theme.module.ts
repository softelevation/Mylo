// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ColorsComponent } from './colors.component';
import { UsersComponent } from './users.component';
import { BrokerComponent } from './broker.component';
import { BrokermapComponent } from './brokermap.component';
import { CustomersComponent } from './customers.component';
import { AddUsersComponent } from './add-users.component';
import { TypographyComponent } from './typography.component';
import { ConfirmationDialogComponent } from './../confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './../confirmation-dialog/confirmation-dialog.service';
// Theme Routing
import { ThemeRoutingModule } from './theme-routing.module';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ThemeRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB1erXOJ7-_yyd3jYyRYrMh7THiUxpAevU',
      libraries: ['places']
    }),
    NgbModule
  ],
  declarations: [
    ColorsComponent,
    UsersComponent,
    BrokerComponent,
    BrokermapComponent,
    CustomersComponent,
    AddUsersComponent,
    ConfirmationDialogComponent,
    TypographyComponent
  ],
  providers: [ ConfirmationDialogService ],
  entryComponents: [ConfirmationDialogComponent]
})
export class ThemeModule { }
