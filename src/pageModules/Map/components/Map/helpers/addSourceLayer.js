import { TILE_API } from '@/constants';

/** ADD PROVINCE RESOURCE AND LAYER * */
export const addProvinTerr = (map) => {
  map.addSource('provinceTerritory', {
    type: 'vector',
    tiles: [`${TILE_API}/diaphan/tinh/tile/{z}/{x}/{y}`],
  });

  // territory fill color
  map.addLayer({
    id: 'province',
    type: 'fill',
    source: 'provinceTerritory',
    'source-layer': 'tinh',
    maxzoom: 10.5,
    paint: {
      'fill-outline-color': '#00cc66',
      'fill-color': 'transparent',
      'fill-opacity': 1,
    },
  });

  // territory border line
  map.addLayer({
    id: 'highlightProvince',
    type: 'line',
    source: 'provinceTerritory',
    'source-layer': 'tinh',
    paint: {
      'line-width': 1.5,
      'line-color': '#c1bda9',
    },
    filter: ['==', 'city_id', ''],
  });

  // territory border line

  // map.addLayer({
  //   id: 'selectProvince',
  //   type: 'line',
  //   source: 'provinceTerritory',
  //   'source-layer': 'tinh',
  //   paint: {
  //     'line-width': 4,
  //     'line-color': '#c1bda9',
  //   },
  //   filter: ['==', 'city_id', ''],
  // });
};

/** ADD DISTRICT RESOURCE AND LAYER * */
export const addDistrictTerr = (map) => {
  map.addSource('districtTerritory', {
    type: 'vector',
    tiles: [`${TILE_API}/diaphan/huyen/tile/{z}/{x}/{y}`],
  });

  map.addSource('infoDistrict', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [],
    },
  });
  // boder line hightlight

  map.addLayer({
    id: 'highlightDistrict',
    type: 'line',
    source: 'districtTerritory',
    'source-layer': 'huyen',
    minzoom: 8,
    maxzoom: 10,
    paint: {
      'line-width': 2.3,
      'line-color': '#1c90ff',
    },
    filter: ['==', 'district_id', ''],
  });

  // border line select

  map.addLayer({
    id: 'selectDistrict',
    type: 'fill',
    source: 'districtTerritory',
    'source-layer': 'huyen',
    minzoom: 8,
    maxzoom: 10,
    paint: {
      'line-width': 4,
      'line-color': '#c1bda9',
    },

    filter: ['==', 'district_id', ''],
  });

  map.addLayer({
    id: 'colorDistrict',
    type: 'fill',
    source: 'infoDistrict',
    minzoom: 8,
    maxzoom: 10,
    paint: {
      'fill-outline-color': 'white',
      'fill-color': 'white',
      'fill-opacity': 0.5,
    },
  });

  map.addLayer({
    id: 'postColorDistrict',
    type: 'fill',
    source: 'infoDistrict',
    minzoom: 8,
    maxzoom: 10,
    paint: {
      'fill-outline-color': 'white',
      'fill-color': 'white',
      'fill-opacity': 0.5,
    },
  });
  // territory fill color
  map.addLayer({
    id: 'district',
    type: 'fill',
    source: 'districtTerritory',
    'source-layer': 'huyen',
    minzoom: 8,
    maxzoom: 9.4,
    paint: {
      'fill-outline-color': 'transparent',
      'fill-color': 'transparent',
      'fill-opacity': 0,
    },
  });

};

/** ADD SUB-DISTRICT RESOURCE AND LAYER * */

export const addSubDistrictTerr = (map) => {
  map.addSource('subDisTerritory', {
    type: 'vector',
    tiles: [`${TILE_API}/diaphan/xa/tile/{z}/{x}/{y}`],
  });

  map.addSource('infoSubDis', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [],
    },
  });

  // territory border
  map.addLayer({
    id: 'highlightSubDis-line',
    type: 'line',
    source: 'subDisTerritory',
    minzoom: 9.5,
    'source-layer': 'xa',
    paint: {
      'line-width': 2,
      'line-color': '#c1bda9',
    },
    filter: ['==', 'ward_id', ''],
  });

  map.addLayer({
    id: 'highlightSubDis-fill',
    type: 'fill',
    source: 'subDisTerritory',
    minzoom: 9.5,
    'source-layer': 'xa',
    paint: {
      'fill-outline-color': 'transparent',
      'fill-color': '#f8f3e0',
      'fill-opacity': 0.2,
    },
    filter: ['==', 'ward_id', ''],
  });

  map.addLayer({
    id: 'selectSubDis-line',
    type: 'line',
    source: 'subDisTerritory',
    'source-layer': 'xa',
    minzoom: 9.5,
    paint: {
      'line-width': 1,
      'line-color': '#c1bda9',
    },
    filter: ['==', 'ward_id', ''],
  });

  map.addLayer({
    id: 'zoomSubDis-line',
    type: 'line',
    source: 'subDisTerritory',
    'source-layer': 'xa',
    minzoom: 11.5,
    paint: {
      'line-width': 1,
      'line-color': '#c1bda9',
    },
  });

  map.addLayer({
    id: 'selectSubDis-fill',
    type: 'fill',
    source: 'subDisTerritory',
    minzoom: 9.5,
    'source-layer': 'xa',
    paint: {
      'fill-outline-color': 'transparent',
      'fill-color': '#f8f3e0',
      'fill-opacity': 0.2,
    },
    filter: ['==', 'ward_id', ''],
  });



  map.addLayer({
    id: 'colorSubDis',
    type: 'fill',
    source: 'infoSubDis',
    minzoom: 9.5,
    maxzoom: 12.5,
    paint: {
      'fill-outline-color': 'white',
      'fill-color': 'white',
      'fill-opacity': 0.5,
    },
  });
  
  map.addLayer({
    id: 'postColorSubDis',
    type: 'fill',
    source: 'infoSubDis',
    minzoom: 9.5,
    maxzoom: 12.5,
    paint: {
      'fill-outline-color': 'white',
      'fill-color': 'white',
      'fill-opacity': 0.5,
    },
  });
  // territory fill color
  map.addLayer({
    id: 'subDis',
    type: 'fill',
    source: 'subDisTerritory',
    minzoom: 9.5,
    'source-layer': 'xa',
    paint: {
      'fill-outline-color': 'transparent',
      'fill-color': 'transparent',
      'fill-opacity': 1,
    },
  });

};
