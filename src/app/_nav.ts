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
    name: 'Customer',
    url: '/theme/customer',
    icon: 'icon-pencil'
  },
  {
    name: 'Brokers',
    url: '/theme/broker',
    icon: 'icon-pie-chart'
  },
  {
    name: 'Brokers on Map',
    url: '/theme/broker-map',
    icon: 'icon-pie-chart'
  }
  
];