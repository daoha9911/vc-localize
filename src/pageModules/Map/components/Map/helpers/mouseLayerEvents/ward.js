/* eslint-disable @typescript-eslint/no-unused-vars  */
import React from 'react';
import mapboxgl from 'mapbox-gl';
import { resetEstateFilterId } from '@/hooks/useQueryLocation';
import { selectSubDis } from '../../operators/selectTerritory';

export const popUpHover = new mapboxgl.Popup({
  closeButton: false,
  anchor: 'left',
});

const onSubDisMouseMove = (e, map) => {
  const feature = e.features[0];
  map.setFilter('highlightSubDis-line', ['==', 'ward_id', feature.properties.ward_id]);
  map.setFilter('highlightSubDis-fill', ['==', 'ward_id', feature.properties.ward_id]);
  popUpHover
    .setLngLat([e.lngLat.lng, e.lngLat.lat])
    .setHTML(
      `<p style="color:#024949;font-size:12px;font-weight:bold;line-height:22px;display:flex;align-items:center;text-align:center;">${feature?.properties?.ward_name}</p>`,
    )
    .addTo(map);

  // if (document.getElementById('txtAddress'))
  //   document.getElementById('txtAddress').innerText = feature.properties.city_name;
};

const checkIfDirectSubDisClick = (e, map) => {
  const sourceLayers = map.queryRenderedFeatures(e.point);
  return sourceLayers[0]?.source === 'subDisTerritory' || sourceLayers[0]?.source === 'priceSubDis';
};

const onSubDisClick = (e, map, { onSelectSubDis, setFilterRef, onLoading } = {}) => {
  if (!checkIfDirectSubDisClick(e, map)) {
    return;
  }

  if(onLoading){
    onLoading()
  }

  const feature = e.features[0];
  if(setFilterRef?.current){
    setFilterRef?.current(
      resetEstateFilterId({
        currentSubDis: feature?.properties?.ward_id,
        currentDis: feature?.properties?.district_id,
        // lat: feature?.properties?.yCentroid,
        // lng: feature?.properties?.xCentroid,
        locationName: `${feature?.properties?.ward_name ? feature?.properties?.ward_name : ''}, ${
          feature?.properties?.district_name ? feature?.properties?.district_name : ''
        },${feature?.properties?.city_name ? feature?.properties?.city_name : ''}`,
      }),
    );
  }
  selectSubDis(map, feature, e);

  if (onSelectSubDis) {
    onSelectSubDis({
      subDis: feature?.properties?.ward_id,
      dis: feature?.properties?.district_id,
      province: feature?.properties?.city_id,
    });
  }
};

export const toggleMouseLayerEventSubDis = (status, map, handleEvent = {}) => {
  const { onSelectSubDis, setFilterRef, onLoading } = handleEvent;

  if (map) {
    if (status === 0) {
      map.off('mousemove', 'subDis', (e) => {
        onSubDisMouseMove(e, map);
      });
      // map.off('dblclick', 'tinh', this.onTinhMouseDown);
      map.off('click', 'subDis', (e) => {
        onSubDisClick(e, map);
      });
      map.off('mouseleave', 'subDis', (e) => {
        popUpHover.remove();
      });
      // map.off('mouseleave', 'tinh', this.onTinhMouseLeave);
    } else {
      map.on('mousemove', 'subDis', (e) => {
        onSubDisMouseMove(e, map);
      });

      map.on('mouseleave', 'subDis', (e) => {
        popUpHover.remove();
      });
      // map.on('dblclick', 'tinh', this.onTinhMouseDown);
      map.on('click', 'subDis', (e) => {
        onSubDisClick(e, map, { onSelectSubDis, setFilterRef, onLoading });
      });
      // map.on('mouseleave', 'tinh', this.onTinhMouseLeave);
    }
  }
};

const addMouseLayerEventSubDis = (map, handleEvent = {}) => {
  toggleMouseLayerEventSubDis(1, map, handleEvent);
};

export default addMouseLayerEventSubDis;
