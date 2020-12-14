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

const getHuyenFeature = (provinceId) =>
  requestData('/administrative-geojson/get-districts', {
    method: methods.get,
    params: {
      cityId: provinceId,
    },
  });

export default getHuyenFeature;
