import { methods, requestData } from '@/utils/request';

export const assessmentPrice = (data) => {
  console.log('data', data);
  return requestData('/assessment-price', {
    method: methods.post,
    params: {
      recordType: data.recordType,
    },
    data,
  });
};

export const sendFeedBack = ({ content }) => {
  return requestData('/send-feedback', {
    method: methods.post,
    data: {
      content
    },
  });
}
