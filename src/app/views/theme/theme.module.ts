// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ColorsComponent } from './colors.component';
import { UsersComponent } from './users.component';
import { AddUsersComponent } from './add-users.component';
import { TypographyComponent } from './typography.component';

// Theme Routing
import { ThemeRoutingModule } from './theme-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ThemeRoutingModule
  ],
  declarations: [
    ColorsComponent,
    UsersComponent,
    AddUsersComponent,
    TypographyComponent
  ]
})
export class ThemeModule { }
