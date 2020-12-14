import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { changeCurrentProvince } from '@/pages/map/model';

const useHandleLayerEventProvince = () => {
  const dispatch = useDispatch();

  const onSelectProvince = useCallback(({ province }) => {
    changeCurrentProvince(dispatch, { province, subDis: null, district: null });
  }, []);

  return {
    onSelectProvince,
  };
};

export default useHandleLayerEventProvince;
