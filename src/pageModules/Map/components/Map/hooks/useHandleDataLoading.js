import { useCallback } from 'react';
import { useDispatch } from "dva";
import setDataLoading from '@/pageModules/Map/actions/setDataLoading';

const useHandleDataLoading = () => {
  const dispatch = useDispatch();

  const onLoading = useCallback(() => {
    setDataLoading(dispatch)(true);
  }, []);

  const onLoadDone = useCallback(() => {
    setDataLoading(dispatch)(false);
  }, [])

  return { onLoading, onLoadDone };
}

export default useHandleDataLoading;
