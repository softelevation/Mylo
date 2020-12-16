import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColorsComponent } from './colors.component';
import { UsersComponent } from './users.component';
import { BrokerComponent } from './broker.component';
import { CustomersComponent } from './customers.component'; 
import { AddUsersComponent } from './add-users.component';
import { TypographyComponent } from './typography.component';
import { from } from 'rxjs';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Theme'
    },
    children: [
      {
        path: '',
        redirectTo: 'colors'
      },
      {
        path: 'colors',
        component: ColorsComponent,
        data: {
          title: 'Colors'
        }
      },
      {
        path: 'users',
        component: UsersComponent,
        data: {
          title: 'users'
        }
      },
	  {
        path: 'broker',
        component: BrokerComponent,
        data: {
          title: 'broker'
        }
      },
      {
        path: 'customers',
        component: CustomersComponent,
        data: {
          title: 'customers'
        }
      },
      {
        path: 'addusers',
        component: AddUsersComponent,
        data: {
          title: 'addusers'
        }
      },
      {
        path: 'typography',
        component: TypographyComponent,
        data: {
          title: 'Typography'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeRoutingModule {}
