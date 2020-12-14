/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useCallback, useRef } from 'react';
// import { useMount } from '@umijs/hooks';
import mapboxgl from 'mapbox-gl';
import { useQueryLocation } from '@/hooks/useQueryLocation';
import {
  changeBoundCorner,
  changeMapInstance,
  changeTerritory,
  changePreviousCoordinates,
} from '@/pages/map/model';
import { useDispatch, useSelector } from 'react-redux';
import { addProvinTerr, addDistrictTerr, addSubDistrictTerr } from '../helpers/addSourceLayer';
import addPointGeoData from '../helpers/addPointGeoData';
import addMouseLayerEventProvince from '../helpers/mouseLayerEvents/province';
import addMouseLayerEventSubDis from '../helpers/mouseLayerEvents/ward';
import addMouseLayerEventDis from '../helpers/mouseLayerEvents/district';
import useOnMoveEnd from './useOnMoveEnd';
import useHandleLayerEventProvince from './useHandleLayerEventProvince';
import useHandleLayerEventDis from './useHandleLayerEventDis';
import useHandleLayerEventSubDis from './useHandleLayerEventSubDis';
import locatePoint from '../operators/locatePoint';
import useHandlePointLoading from './useHandlePointLoading';
import useHandleDataloading from './useHandleDataLoading';
import getMapGeoInfo from '../helpers/getMapGeoInfo';
import useTerritoryChange from './useTerritoryChange';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hpbmhscyIsImEiOiIwNFhac19NIn0.ywzcihERU9ETEyUxphFcIQ';

export const getNewMap = (mapContainer, center, zoom, isSatellite) => {
  if (mapContainer) {
    return new mapboxgl.Map({
      container: mapContainer,
      style: !isSatellite ? 'mapbox://styles/mapbox/light-v10' : 'mapbox://styles/mapbox/satellite-v9', // stylesheet location
      center,
      zoom,
    });
  }
  return null;
};

const useMap = (center, zoom, container) => {
  const { filters, setFilter } = useQueryLocation();
  const { onMoveEnd } = useOnMoveEnd();
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const { onSelectProvince } = useHandleLayerEventProvince();
  const { onSelectDis } = useHandleLayerEventDis();
  const { onSelectSubDis } = useHandleLayerEventSubDis();
  const [map, setMap] = useState(null);
  useTerritoryChange(map);
  const handlePointLoading = useHandlePointLoading();
  const handleDataLoading = useHandleDataloading();

  const setFilterRef = useRef(setFilter);

  useEffect(() => {
    setFilterRef.current = setFilter;
  }, [filters]);

  const handleCloseMobileMap = useCallback(() => {
    dispatch({
      type: 'mobileMap/closeMobileMap',
    });
  }, []);

  const generateMap = (mapContainer, isSatellite) => {
    const newMap = getNewMap(mapContainer, center, zoom, isSatellite);
    setMap(newMap);
    if (newMap) {
      newMap.on('load', () => {
        addProvinTerr(newMap);
        addSubDistrictTerr(newMap);
        addDistrictTerr(newMap);
        addPointGeoData(newMap, filters, setFilterRef, handleCloseMobileMap, {
          ...handlePointLoading,
        });
        setLoaded(true);
        const mapGeoinfo = getMapGeoInfo(newMap);
        changePreviousCoordinates(dispatch, {
          center: [mapGeoinfo.center.lng, mapGeoinfo.center.lat],
          zoom: newMap?.getZoom(),
        });
        changeBoundCorner(dispatch, {
          topRight: mapGeoinfo.topRight,
          bottomLeft: mapGeoinfo.bottomLeft,
          center: mapGeoinfo.center,
          zoom: mapGeoinfo.zoom
        });
      });
    }
  };

  useEffect(() => {
    if (!map) {
      return;
    }
    // addMouseLayerEvent(map, { changeLocation });
    addMouseLayerEventProvince(map, { onSelectProvince, setFilterRef, ...handleDataLoading });
    addMouseLayerEventDis(map, { onSelectDis, setFilterRef, ...handleDataLoading });
    addMouseLayerEventSubDis(map, { onSelectSubDis, setFilterRef, ...handleDataLoading });
  }, [map]);

  useEffect(() => {
    if (!map) {
      return;
    }

    // map.on('movestart', () => {
    //   handleDataLoading?.onLoading();
    // })

    map.on('moveend', (event) => {
      if (event.disableDataLoadDone) {
        const mapGeoinfo = getMapGeoInfo(map);
        onMoveEnd(map, {
          ...mapGeoinfo,
        });
      } else {
        const mapGeoinfo = getMapGeoInfo(map);
        onMoveEnd(map, {
          ...mapGeoinfo,
          ...handleDataLoading,
        });
      }
    });
  }, [map, filters?.where?.id]);

  const mapLocatePoint = useCallback(
    (item, featureFocusOn) => {
      if (!map || !item) {
        return;
      }
      handleDataLoading?.onLoading();
      const checkSourceLoadInterval = setInterval(async () => {
        if (
          map.isSourceLoaded('provinceTerritory') &&
          map.isSourceLoaded('districtTerritory') &&
          map.isSourceLoaded('subDisTerritory')
        ) {
          clearInterval(checkSourceLoadInterval);
          const features = await locatePoint(map, item, featureFocusOn);
          // handleDataLoading?.onLoadDone();
          const locateTerritory = {
            province: null,
            dis: null,
            subDis: null,
          };
          // console.log('locate point ', features);
          for (let i = 0; i < features.length; i += 1) {
            if (features[i].layer.id === 'subDis') {
              locateTerritory.subDis = features[i]?.properties?.ward_id;
              locateTerritory.dis = features[i]?.properties?.district_id;
              locateTerritory.province = features[i]?.properties?.city_id;
              break;
            } else if (features[i].layer.id === 'district') {
              locateTerritory.dis = features[i]?.properties?.district_id;
              locateTerritory.province =
                features[i]?.properties?.city_id || locateTerritory?.province;
            } else if (features[i].layer.id === 'province') {
              locateTerritory.province = features[i]?.properties?.city_id;
            }
          }

          changeTerritory(dispatch, locateTerritory);
        }
      }, 1000);
    },
    [map, loaded],
  );

  return { map, generateMap, locatePoint: mapLocatePoint };
};

export default useMap;
