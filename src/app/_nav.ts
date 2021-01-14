import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    // badge: {
    //   variant: 'info',
    //   text: 'NEW'
    // }
  },
  // {
  //   title: true,
  //   name: 'Users'
  // },
  // {
  //   name: 'Add users',
  //   url: '/theme/addusers',
  //   icon: 'icon-drop'
  // },
  {
    name: 'Brokers',
    url: '/theme/broker',
    icon: 'icon-pie-chart'
  },
  {
    name: 'Users',
    url: '/theme/users',
    icon: 'icon-pencil'
  },
  {
    name: 'Brokers on Map',
    url: '/theme/users',
    icon: 'icon-pie-chart'
  },
  {
    name: 'Customers',
    url: '/theme/customers',
    icon: 'icon-pie-chart'
  },
  
];