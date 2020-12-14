/* eslint-disable @typescript-eslint/no-unused-vars */
import { remove, findIndex } from 'lodash';

const FormRegisterModel = {
  namespace: 'compare',
  state: {
    estates: [],
  },
  effects: {
    *addEstate({ payload }, { put }) {
      yield put({
        type: 'updateCompare',
        payload: {
          id: payload.id,
          comapreType: payload.type,
          type: 'add',
        },
      });
    },
    *removeEstate({ payload }, { put }) {
      yield put({
        type: 'updateCompare',
        payload: {
          id: payload.id,
          type: 'remove',
        },
      });
    },
  },
  reducers: {
    updateCompare(state, { payload }) {
      if (payload.type === 'add') {
        if (findIndex(state.estates, { id: payload.id }) === -1 && payload.comapreType) {
          return {
            ...state,
            estates: [...state.estates, { id: payload.id, type: payload.comapreType }],
          };
        }
      }
      if (payload.type === 'remove') {
        if (findIndex(state.estates, { id: payload.id }) !== -1) {
          const newEstate = [...state.estates];
          remove(newEstate, (n) => n.id === payload.id);
          return {
            ...state,
            estates: newEstate,
          };
        }
      }
      return {
        ...state,
      };
    },
  },
};

export default FormRegisterModel;
