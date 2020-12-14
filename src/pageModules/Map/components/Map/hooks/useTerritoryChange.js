/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useCallback } from 'react';
import { updateProvinceColors, updateDistrictColors } from '@/pages/map/model';
import { useDispatch } from 'react-redux';
import { useQueryLocation } from '@/hooks/useQueryLocation';
import {usePrevious} from '@umijs/hooks';
import { decorateDistrict, decorateCity, decorateSubDis } from '../operators/selectTerritory';

const { useSelector } = require('react-redux');

const useTerritoryChange = (map) => {
  const { currentProvince, currentDis, currentSubDis, colorType } = useSelector((state) => state?.mapsource);

  const { filters, setFilter } = useQueryLocation();
  const dispatch = useDispatch();

  const getProvinceColorStops = useCallback(
    (stops) => {
      updateProvinceColors(dispatch, stops);
    },
    [dispatch],
  );

  const getDistrictColorStops = useCallback(
    (stops) => {
      updateDistrictColors(dispatch, stops);
    },
    [dispatch],
  );

  const previousDistrict = usePrevious(currentDis);
  useEffect(() => {
    // console.log('decorate');
    if (!map) {
      return;
    }
    try {
      decorateDistrict(map, currentDis, filters?.where?.recordType, {
        getColorStops: getDistrictColorStops,
        colorType,
        onlyChangeType: currentDis === previousDistrict
      });
    } catch (err) {
      map.on('load', () => {
        decorateDistrict(map, currentDis, filters?.where?.recordType, {
          getColorStops: getDistrictColorStops,
          colorType,
          onlyChangeType: currentDis === previousDistrict
        });
      });
    }
  }, [map, currentDis, colorType]);

  const previousProvince = usePrevious(currentProvince);
  const previousRecordType = usePrevious(filters?.where?.recordType);

  useEffect(() => {
    if (!map) {
      return;
    }
    try {
      // console.log('decorate-here');
      decorateCity(map, currentProvince, filters?.where?.recordType, {
        getColorStops: getProvinceColorStops,
        colorType,
        onlyChangeType: currentProvince === previousProvince && filters?.where?.recordType !== previousRecordType
      });
    } catch (error) {
      map.on('load', () => {
        decorateCity(map, currentProvince, filters?.where?.recordType, {
          getColorStops: getProvinceColorStops,
          colorType,
          onlyChangeType: currentProvince === previousProvince && filters?.where?.recordType !== previousRecordType
        });
      });
    }
  }, [map, currentProvince, colorType]);

  useEffect(() => {
    // setFilter({
    // id: null,
    // buildingId: null
    // });
  }, [currentProvince, currentDis, currentSubDis]);

  useEffect(() => {
    if (!map) {
      return;
    }
    try {
      decorateSubDis(map, currentSubDis);
    } catch (error) {
      map.on('load', () => {
        decorateSubDis(map, currentSubDis);
      });
    }
  }, [map, currentSubDis]);
};

export default useTerritoryChange;
