import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { changeTerritory } from '@/pages/map/model';

const useHandleLayerEventDis = () => {
  const dispatch = useDispatch();

  const onSelectDis = useCallback(({ dis, province }) => {
    changeTerritory(dispatch, { dis, province, subDis: null });
  }, []);

  return {
    onSelectDis,
  };
};

export default useHandleLayerEventDis;
