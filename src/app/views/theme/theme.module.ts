// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { ColorsComponent } from './colors.component';
import { UsersComponent } from './users.component';
import { BrokerComponent } from './broker.component';
import { CustomersComponent } from './customers.component';
import { AddUsersComponent } from './add-users.component';
import { TypographyComponent } from './typography.component';

// Theme Routing
import { ThemeRoutingModule } from './theme-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ThemeRoutingModule
  ],
  declarations: [
    ColorsComponent,
    UsersComponent,
    BrokerComponent,
    CustomersComponent,
    AddUsersComponent,
    TypographyComponent
  ]
})
export class ThemeModule { }
