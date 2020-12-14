import { parse } from 'querystring';
import pathRegexp from 'path-to-regexp';
import moment from 'moment';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = (path) => reg.test(path);
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};
export const getPageQuery = () => parse(window.location.href.split('?')[1]);
/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */

export const getAuthorityFromRouter = (router = [], pathname) => {
  const authority = router.find(
    ({ routes, path = '/', target = '_self' }) =>
      (path && target !== '_blank' && pathRegexp(path).exec(pathname)) ||
      (routes && getAuthorityFromRouter(routes, pathname)),
  );
  if (authority) return authority;
  return undefined;
};
export const getRouteAuthority = (path, routeData) => {
  let authorities;
  routeData.forEach((route) => {
    // match prefix
    if (pathRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
      if (route.authority) {
        authorities = route.authority;
      } // exact match

      if (route.path === path) {
        authorities = route.authority || authorities;
      } // get children authority recursively

      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};

export const convertDerectionText = (diretion) => {
  switch (diretion) {
    case 'bac':
      return 'Bắc';
    case 'tay':
      return 'Tây';
    case 'dong':
      return 'Đông';
    case 'nam':
      return 'Nam';
    case 'dong bac':
      return 'Đông Bắc';
    case 'tay bac':
      return 'Tây Bắc';
    case 'dong nam':
      return 'Đông Nam';
    case 'tay nam':
      return 'Tây Nam';
    default:
      return null;
  }
};

export const convertContactType = (contactType) => {
  switch (contactType) {
    case 'chinh chu':
      return 'Chính chủ';
    case 'moi gioi':
      return 'Môi giới';
    case 'khong xac dinh':
      return 'Không xác định';
    default:
      return null;
  }
};

export const convertTimeDiffToDay = (start) => {
  const momentStart = moment(start, 'DD-MM-YYYY');
  const now = moment();
  const Diff = moment(now).diff(momentStart, 'day');
  if (Math.abs(Diff) < 1) {
    return 'Mới';
  }

  return `${Math.abs(Diff)} ngày trước`;
};

export const convertPositionFromPrice = (minrange, price, maxrange) => {
  return ((price - minrange) / (maxrange - minrange)) * 100;
};

export const convertRangeToCurrency = (price) => {
  if (price?.length > 3) {
    return 'Tỷ';
  }
  return 'Triệu';
};

export const formattedNumber = (num) => {
  if ((typeof num === 'string' && !num.length) || num === null || num === undefined) {
    return null;
  }

  if (!num) return 0;

  const parts = num.toString().split('.');

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  if (parts.join('.')?.length > 3) {
    return parseFloat(parts.join('.')).toFixed(1);
  }
  return parts.join('.');
};

export const formatCurrency = (price) => {
  if (typeof price === 'number') {
    if (price > 1000) {
      return `${price / 1000} Tỷ`;
    }
  }
  return `${price} Triệu`;
};

export const formatNumber = (price) => {
  if (price > 1000) {
    return price / 1000;
  }
  return price;
};

export const normalizeString = (str) =>
  str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');

export const regxName = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;

const removeAccents = (str) =>
  str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');

const removeSpecialCharacter = (str) => str.replace(/[^a-zA-Z0-9\s ]/g, '-');

export const normalizeSeoText = (str) => (str ? removeSpecialCharacter(removeAccents(str)) : '');
