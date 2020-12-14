// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import allRoutes from './routes';

const { REACT_APP_ENV } = process.env;

const envListKeys = ['UMI_APP_TILE_API', 'UMI_APP_BACKEND_HOST', 'UMI_APP_ADMINISTRATIVE', 'UMI_APP_AUTH_API', 'UMI_APP_GOOGLE_MAP_API_KEY'];

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  define: {
    ...envListKeys.reduce((acc, key) => {
      return { ...acc, [`process.env.${key}`]: process.env[key] }
    }, {})
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: allRoutes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  extraPostCSSPlugins: [
    require('tailwindcss')
  ]
});
