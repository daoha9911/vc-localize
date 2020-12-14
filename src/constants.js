export const TILE_API = process.env.UMI_APP_TILE_API ? process.env.UMI_APP_TILE_API : '';
export const DATA_API_URL = process.env.UMI_APP_BACKEND_HOST
  ? process.env.UMI_APP_BACKEND_HOST
  : '';

export const AUTH_API_URL =
  process.env.NODE_ENV !== 'development'
    ? process.env.UMI_APP_AUTH_API
    : process.env.UMI_APP_BACKEND_LOCAL || process.env.UMI_APP_BACKEND_HOST_LOCAL;
export const clientId = '1033350675608-8mj3qnes2650r6om4lk7o5a9eur6gbrp.apps.googleusercontent.com';
export const appId = '254208806033340';
export const ZALO_APP_ID = '386134788463927273';
export const ZALO_APP_SECRET = '9yBHBgngK6O3LPCH6Rck';
const LOCAL_LINK = 'http://localhost:8000/welcom';
const STATE_STRING = 'bomaytest';
export const ZALO_LINK = `https://oauth.zaloapp.com/v3/permission?app_id=${ZALO_APP_ID}&redirect_uri=${LOCAL_LINK}&state=${STATE_STRING}
`;
export const ADMINISTRATIVE_URL = process.env.UMI_APP_ADMINISTRATIVE;

export const GEOCODING_URL = process.env.UMI_APP_GEOCODING;

// export const clientId = `${process.env.GOOGLE_CLIENT_ID}`;
