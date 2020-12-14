/* eslint-disable @typescript-eslint/no-unused-vars */
import { requestData, methods } from '@/utils/request';

export const getChartByDistrict = (
  recordType = 'apartment',
  administrativeType = 'district',
  id,
) => {
  return requestData('/administrative-graph', {
    method: methods.get,
    params: {
      recordType,
      administrativeType,
      id,
    },
  });
};
