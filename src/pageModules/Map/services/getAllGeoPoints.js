const { requestData, methods } = require('@/utils/request');

export const getAllGeoPoints = (recordType = 'apartment') =>
  requestData('/all-geojson-records', { method: methods.get, params: { recordType } });
