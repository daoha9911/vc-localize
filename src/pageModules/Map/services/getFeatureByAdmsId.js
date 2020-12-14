import axios from 'axios';
import { request as createRequest, methods } from '@/utils/request';
import { ADMINISTRATIVE_URL } from '@/constants';

export const typeMaps = {
  subDis: 'ward',
  district: 'district',
  province: 'city',
};

const axiosRequest = axios.create({
  baseURL: `${ADMINISTRATIVE_URL}`,
});

const request = createRequest(axiosRequest);

const getFeatureByAdsId = (type, id) => {
  if (!id) {
    return {
      success: false,
    };
  }
  return request(`/administrative-geojson/${type}`, {
    method: methods.get,
    params: {
      [`${type}Id`]: id,
    },
  });
};

export default getFeatureByAdsId;
