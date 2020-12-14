/* eslint-disable @typescript-eslint/no-unused-vars */
const FormRegisterModel = {
  namespace: 'formregister',
  state: {
    isOpen: false,
    scenario: '',
  },
  reducers: {
    openForm(state, { payload }) {
      return {
        ...state,
        isOpen: true,
        scenario: payload ? payload.data : '',
      };
    },

    closeForm(state, _) {
      return {
        ...state,
        isOpen: false,
      };
    },
  },
};

export const closeForm = () => ({
  type: 'formregister/closeForm',
});

export const openForm = () => ({
  type: 'formregister/openForm',
});

export default FormRegisterModel;
