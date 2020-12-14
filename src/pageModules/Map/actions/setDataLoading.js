import { namespace } from '@/pages/map/model';

const setDataLoading = (dispatch) => (isLoading) =>
  dispatch({
    type: `${namespace}/setDataLoading`,
    payload: {
      isLoading,
    },
  });

export default setDataLoading;
