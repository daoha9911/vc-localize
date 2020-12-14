/* eslint-disable */
import { getUserProfile, updateUserProfile, updatePassword } from '@/services/user';
import { handleFormResultNotSuccess } from '@/helpers/dvaForm';
import { notification } from 'antd';
const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetchUserProfile({ payload }, { call, put }) {
      const response = yield call(getUserProfile, payload);
      yield put({
        type: 'saveProfileUser',
        payload: response.data,
      });
    },

    *updateCurrent({ payload }, { call, put }) {
      const data = {
        ...payload.data,
        idCardOrTaxCode: '35119802',
        defaultRole: 'basic',
        avatar: 'http://lorempixel.com/640/480',
      };
      try {
        const response = yield call(updateUserProfile, data);
        if (response.success) {
          yield put({
            type: 'saveProfileUser',
            payload: response.data,
          });
        } else {
          notification.error({
            message: 'Vui lòng thử lại',
          });
        }
      } catch (error) {
        notification.error({
          message: 'Vui lòng thử lại',
        });
      }
    },

    *updatePassword({ payload }, { call }) {
      try {
        const response = yield call(updatePassword, payload?.data);
        if (!response.success) {
          handleFormResultNotSuccess(response, payload);
          notification.error({
            message: 'Mật khẩu không đúng',
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
    saveProfileUser(state, { payload }) {
      return { ...state, currentUser: payload };
    },
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
