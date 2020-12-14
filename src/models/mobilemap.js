/* eslint-disable @typescript-eslint/no-unused-vars */

const MobileMap = {
  namespace: 'mobileMap',
  state: {
    isOpen: false,
  },
  effects: {
    *openMobileMap({ payload }, { put }) {
      yield put({
        type: 'updateMobileMapStatus',
        payload: {
          isOpen: true,
        },
      });
    },
    *closeMobileMap({ payload }, { put }) {
      yield put({
        type: 'updateMobileMapStatus',
        payload: {
          isOpen: false,
        },
      });
    },
  },
  reducers: {
    updateMobileMapStatus(state, { payload }) {
      return {
        ...state,
        isOpen: payload.isOpen,
      };
    },
  },
};

export default MobileMap;
