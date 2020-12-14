import { namespace } from '@/pages/map/model';

const setPointLoading = (dispatch) => (isLoading) =>
  dispatch({
    type: `${namespace}/setPointLoading`,
    payload: {
      isLoading,
    },
  });

export default setPointLoading;
