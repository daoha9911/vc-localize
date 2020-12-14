import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { changeTerritory } from '@/pages/map/model';

const useHandleLayerEventSubDis = () => {
  const dispatch = useDispatch();

  const onSelectSubDis = useCallback(({ dis, subDis, province }) => {
    changeTerritory(dispatch, { dis, subDis, province });
  }, []);

  return {
    onSelectSubDis,
  };
};

export default useHandleLayerEventSubDis;
