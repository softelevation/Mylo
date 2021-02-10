import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColorsComponent } from './colors.component';
import { UsersComponent } from './users.component';
import { BrokerComponent } from './broker.component';
import { BrokermapComponent } from './brokermap.component';
import { CustomersComponent } from './customers.component'; 
import { AddUsersComponent } from './add-users.component';
import { TypographyComponent } from './typography.component';
import { from } from 'rxjs';

const routes: Routes = [
  {
    path: '',
    data: {
      title: ''
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
        path: 'customer',
        component: UsersComponent,
        data: {
          title: 'Customer'
        }
      },
	  {
        path: 'broker',
        component: BrokerComponent,
        data: {
          title: 'Broker'
        }
      },
      {
        path: 'broker-map',
        component: BrokermapComponent,
        data: {
          title: 'Broker-map'
        }
      },
      {
        path: 'customers',
        component: CustomersComponent,
        data: {
          title: 'Customers'
        }
      },
      {
        path: 'addusers',
        component: AddUsersComponent,
        data: {
          title: 'Add broker'
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
