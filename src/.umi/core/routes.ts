// @ts-nocheck
import { ApplyPluginsType, dynamic } from '/Users/ha/Desktop/vc-localize-clone/node_modules/@umijs/runtime';
import { plugin } from './plugin';
import LoadingComponent from '@/components/PageLoading/index';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__SecurityLayout' */'/Users/ha/Desktop/vc-localize-clone/src/layouts/SecurityLayout'), loading: LoadingComponent}),
    "routes": [
      {
        "path": "/",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__AppLayout' */'/Users/ha/Desktop/vc-localize-clone/src/layouts/AppLayout'), loading: LoadingComponent}),
        "routes": [
          {
            "path": "/",
            "redirect": "/welcome",
            "exact": true
          },
          {
            "path": "/welcome",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__home__index' */'/Users/ha/Desktop/vc-localize-clone/src/layouts/home/index'), loading: LoadingComponent}),
            "routes": [
              {
                "path": "/welcome",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__landingPage__index' */'/Users/ha/Desktop/vc-localize-clone/src/pages/landingPage/index'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "path": "/map",
            "name": "map",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__map' */'/Users/ha/Desktop/vc-localize-clone/src/pages/map'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "path": "/user",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__UserSecurityLayout' */'/Users/ha/Desktop/vc-localize-clone/src/layouts/UserSecurityLayout'), loading: LoadingComponent}),
            "routes": [
              {
                "path": "/user/profile",
                "name": "profile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__profile' */'/Users/ha/Desktop/vc-localize-clone/src/pages/profile'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/user/compare",
                "name": "compare",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__compare' */'/Users/ha/Desktop/vc-localize-clone/src/pages/compare'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Users/ha/Desktop/vc-localize-clone/src/pages/404'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      },
      {
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Users/ha/Desktop/vc-localize-clone/src/pages/404'), loading: LoadingComponent}),
        "exact": true
      }
    ]
  },
  {
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Users/ha/Desktop/vc-localize-clone/src/pages/404'), loading: LoadingComponent}),
    "exact": true
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
