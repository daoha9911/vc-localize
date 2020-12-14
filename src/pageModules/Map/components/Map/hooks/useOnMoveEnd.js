/* eslint-disable */
import { useCallback } from 'react';
import debounce from 'lodash/debounce';
import { useDispatch } from 'react-redux';
import { changeBoundCorner, changePreviousCoordinates } from '@/pages/map/model';

/*
 * Hook để kết nối model map và hàm phản hồi sự kiện moveEnd của map
 */

const useOnMoveEnd = () => {
  const dispatch = useDispatch();

  const onMoveEnd = useCallback(debounce((map, { topRight, bottomLeft, zoom, center, onLoadDone  }) => {
    if (map?.getZoom() < 15) {
      const previousCoordinate = {
        center: [center?.lng, center?.lat],
        zoom,
      };
      changePreviousCoordinates(dispatch, previousCoordinate);
    }
    changeBoundCorner(dispatch, { topRight, bottomLeft, zoom, center });
    if(onLoadDone) {
      onLoadDone()
    }
  }, 500), []);

  return {
    onMoveEnd,
  };
};

export default useOnMoveEnd;
