import { request, methods } from '@/utils/request';
import axios from 'axios';
import { ADMINISTRATIVE_URL } from '@/constants';

const axiosRequest = axios.create({
  baseURL: `${ADMINISTRATIVE_URL}`,
  headers: {
    // "Accept": 'application/json',

    'x-language': 'vi',
  },
});

const requestData = request(axiosRequest);

const getXaFeature = (districtId) =>
  requestData('/administrative-geojson/get-wards', {
    method: methods.get,
    params: {
      districtId,
    },
  });

export default getXaFeature;
