const allRoutes = [
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/AppLayout',
        // authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/welcome',
          },
          // {
          //   path: '/welcome',
          //   name: 'welcome',
          //   component: './welcome',
          // },
          {
            path: '/welcome',
            component: '../layouts/home/index',
            routes: [
              {
                path: '/welcome',
                component: '../pages/landingPage/index',
              },
            ],
          },
          {
            path: '/map',
            name: 'map',
            component: './map',
          },
          {
            path: '/user',
            component: '../layouts/UserSecurityLayout',
            routes: [
              {
                path: '/user/profile',
                name: 'profile',
                component: './profile',
              },
              {
                path: '/user/compare',
                name: 'compare',
                component: './compare',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];

export default allRoutes;
