import { getUserEstate } from '@/services/estate';
import { notification } from 'antd';

const EstateModel = {
  namespace: 'estate',
  state: {
    listBookmarkEstate: {},
  },
  effects: {
    *getUserEstate({ payload }, { call, put }) {
      try {
        const response = yield call(getUserEstate, payload);
        if (response.success) {
          yield put({
            type: 'saveUserEstate',
            payload: response.data,
          });
        }
      } catch (error) {
        notification.error({
          message: 'Vui lòng thử lại',
        });
      }
    },
  },
  reducers: {
    saveUserEstate(state, { payload }) {
      return {
        ...state,
        listBookmarkEstate: payload,
      };
    },
  },
};
export default EstateModel;
