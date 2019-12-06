import React from 'react';

import WelcomeLayout from '@/layouts/WelcomeLayout';
import BasicLayout from '@/layouts/BasicLayout';

const Dashboard = React.lazy(() => import('@/pages/Dashboard'));
const UserLogin = React.lazy(() => import('@/pages/UserLogin'));
const Charts = React.lazy(() => import('@/pages/Charts'));
const BasicCharts = React.lazy(() => import('@/pages/BasicCharts'));
const Terms = React.lazy(() => import('@/pages/Terms'));
const Result = React.lazy(() => import('@/pages/Result'));
const BasicList = React.lazy(() => import('@/pages/BasicList'));
const ProjectList = React.lazy(() => import('@/pages/ProjectList'));
const BasicTable = React.lazy(() => import('@/pages/BasicTable'));
const GeneralTable = React.lazy(() => import('@/pages/GeneralTable'));
const Profile = React.lazy(() => import('@/pages/Profile'));
const Setting = React.lazy(() => import('@/pages/Setting'));
const Fail = React.lazy(() => import('@/pages/Fail'));
const Empty = React.lazy(() => import('@/pages/Empty'));
const Forbidden = React.lazy(() => import('@/pages/Forbidden'));
const NotFound = React.lazy(() => import('@/pages/NotFound'));
const ServerError = React.lazy(() => import('@/pages/ServerError'));
const Permission = React.lazy(() => import('@/pages/Permission'));
const Role = React.lazy(() => import('@/pages/Role'));

const routerConfig = [
  {
    path: '/user',
    component: WelcomeLayout,
    children: [
      { path: '/login', component: UserLogin },
      { path: '/', redirect: '/login' },
      { component: NotFound },
    ],
  },
  {
    path: '/',
    component: BasicLayout,
    children: [
      { path: '/profile/general', component: Terms },
      { path: '/dashboard/monitor', component: Dashboard },
      { path: '/chart/basic', component: BasicCharts },
      { path: '/list/basic', component: BasicList },
      { path: '/list/general', component: ProjectList },
      { path: '/result/success', component: Result },
      { path: '/result/fail', component: Fail },
      { path: '/table/basic', component: BasicTable },
      { path: '/profile/basic', component: Profile },
      { path: '/chart/general', component: Charts },
      { path: '/table/general', component: GeneralTable },
      { path: '/account/setting', component: Setting },
      { path: '/exception/500', component: ServerError },
      { path: '/exception/403', component: Forbidden },
      { path: '/exception/204', component: Empty },
      { path: '/exception/404', component: NotFound },
      { path: '/permission/permission', component: Permission },
      { path: '/permission/role', component: Role },
      { path: '/', redirect: '/dashboard/monitor' },
      { component: NotFound },
    ],
  },
];

export default routerConfig;
