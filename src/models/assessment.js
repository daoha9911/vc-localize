import { assessmentPrice } from '@/services/assessment';
import { notification } from 'antd';

const AssessmentModel = {
  namespace: 'assessment',
  state: {
    price: '',
  },
  effects: {
    *assessmentPrice({ payload }, { call, put }) {
      console.log('assessment payload', payload);
      try {
        const response = yield call(assessmentPrice, payload.data);
        if (response.success) {
          yield put({
            type: 'setPriceAsssessment',
            payload: response.data,
          });
          payload.onSuccess();
        }
      } catch (error) {
        notification.error({
          message: 'Vui lòng thử lại',
        });
      }
    },
  },
  reducers: {
    setPriceAsssessment(state, { payload }) {
      return {
        ...state,
        price: payload,
      };
    },
  },
};

export default AssessmentModel;
