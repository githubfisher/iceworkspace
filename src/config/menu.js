// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: 'feedback',
    path: 'https://github.com/alibaba/ice',
    external: true,
    newWindow: true,
    icon: 'message',
    id: 'Menu_hx7k9',
  },

  {
    name: 'help',
    path: 'https://alibaba.github.io/ice',
    external: true,
    newWindow: true,
    icon: 'bangzhu',
    id: 'Menu_ph7d5',
  },
];

const asideMenuConfig = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: 'home2',
    children: [
      { name: 'monitor', path: '/dashboard/monitor', id: 'Menu_ck6p1' },
    ],
    id: 'Menu_hwudg',
  },
  {
    name: 'chart',
    path: '/chart',
    icon: 'chart',
    children: [
      { name: 'basic', path: '/chart/basic', id: 'Menu_bggd3' },
      { name: 'general', path: '/chart/general', id: 'Menu_y1env' },
    ],
    id: 'Menu_vyq5p',
  },
  {
    name: '表格页',
    path: '/table',
    icon: 'cascades',
    children: [
      { name: 'basic', path: '/table/basic', id: 'Menu_610cg' },
      { name: 'general', path: '/table/general', id: 'Menu_13ovg' },
    ],
    id: 'Menu_rayld',
  },
  {
    name: '列表页',
    path: '/list',
    icon: 'menu',
    children: [
      { name: 'basic', path: '/list/basic', id: 'Menu_xvjey' },
      { name: 'general', path: '/list/general', id: 'Menu_h7ppc' },
    ],
    id: 'Menu_4wqme',
  },
  {
    name: 'profile',
    path: '/profile',
    icon: 'content',
    children: [
      { name: 'basic', path: '/profile/basic', id: 'Menu_k51k6' },
      { name: 'terms', path: '/profile/general', id: 'Menu_2oruo' },
    ],
    id: 'Menu_nw1sc',
  },
  {
    name: 'result',
    path: '/result',
    icon: 'question',
    children: [
      { name: 'success', path: '/result/success', id: 'Menu_83pys' },
      { name: 'fail', path: '/result/fail', id: 'Menu_nn4nt' },
    ],
    id: 'Menu_h5x15',
  },
  {
    name: 'account',
    path: '/account',
    icon: 'yonghu',
    children: [{ name: 'setting', path: '/account/setting', id: 'Menu_h9lc1' }],
    id: 'Menu_qj38y',
  },
  {
    name: 'exception',
    path: '/exception',
    icon: 'notice',
    children: [
      { name: '204', path: '/exception/204', id: 'Menu_fu8qc' },
      { name: '403', path: '/exception/403', id: 'Menu_bpp71' },
      { name: '404', path: '/exception/404', id: 'Menu_xcv0o' },
      { name: '500', path: '/exception/500', id: 'Menu_d7tv9' },
    ],
    id: 'Menu_gthc6',
  },
  { 
    name: '权限管理', 
    path: '/permission',
    icon: 'menu',
    children: [
      { name: '权限', path: '/permission/permission', id: 'Menu_gtsoj' },
      { name: '角色', path: '/permission/role', id: 'Menu_jgrs5' },
    ], 
    id: 'Menu_aph45',
  },
  
];

export { headerMenuConfig, asideMenuConfig };
