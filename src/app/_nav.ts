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
    url: '/customer',
    icon: 'icon-pencil'
  },
  {
    name: 'Brokers',
    url: '/broker',
    icon: 'icon-pie-chart'
  },
  {
    name: 'Brokers on Map',
    url: '/broker-map',
    icon: 'icon-pie-chart'
  }
  
];