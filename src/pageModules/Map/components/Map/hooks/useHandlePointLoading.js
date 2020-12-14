import { useCallback } from 'react';
import { useDispatch } from "dva";
import setPointLoading from '@/pageModules/Map/actions/setPointLoading';

const useHandlePointLoading = () => {
  const dispatch = useDispatch();

  const onLoading = useCallback(() => {
    setPointLoading(dispatch)(true);
  }, []);

  const onLoadDone = useCallback(() => {
    setPointLoading(dispatch)(false);
  }, [])

  return { onLoading, onLoadDone };
}

export default useHandlePointLoading;
