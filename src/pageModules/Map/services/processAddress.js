import { requestData, methods } from '@/utils/request';

export const processData = (
  address = 'số 12 ngõ 24 nguyễn trãi khương trung thanh xuân hà nội',
) => {
  return requestData('/address-parsing', {
    method: methods.get,
    params: {
      address,
    },
  });
};
