import {selectCity} from '../../operators/selectTerritory';

const onProvinceMouseMove = (e, map) => {
  const feature = e.features[0];
  map.setFilter('highlightProvince', ['==', 'city_id', feature.properties.city_id]);
  // if (document.getElementById('txtAddress'))
  //   document.getElementById('txtAddress').innerText = feature.properties.city_name;
};

const checkIfDirectProvinceClick = (e, map) => {
  const sourceLayers = map.queryRenderedFeatures(e.point);
  return sourceLayers[0]?.source === 'provinceTerritory';
}

const onProvinceClick = (e, map, onSelectProvince, onLoading) => {
  if (!checkIfDirectProvinceClick(e, map)) {
    return;
  }

  if(onLoading){
    onLoading();
  }

  const feature = e.features[0];
  selectCity(map, feature, e);
  onSelectProvince({ province: feature.properties.city_id });
};

export const toggleMouseLayerEventProvince = (status, map, handleEvent = {}) => {
  const { onSelectProvince, onLoading } = handleEvent
  if (map) {
    if (status === 0) {
      map.off('mousemove', 'province', (e) => {
        onProvinceMouseMove(e, map);
      });
      // map.off('dblclick', 'tinh', this.onTinhMouseDown);
      map.off('click', 'province', (e) => {
        onProvinceClick(e, map, onSelectProvince);
      });
      // map.off('mouseleave', 'tinh', this.onTinhMouseLeave);
    } else {
      map.on('mousemove', 'province', (e) => {
        onProvinceMouseMove(e, map);
      });
      // map.on('dblclick', 'tinh', this.onTinhMouseDown);
      map.on('click', 'province', (e) => {
        onProvinceClick(e, map, onSelectProvince, onLoading);
      });
      // map.on('mouseleave', 'tinh', this.onTinhMouseLeave);
    }
  }
};

const addMouseLayerEventProvince = (map, handleEvent = {}) => {
  toggleMouseLayerEventProvince(1, map, handleEvent);
};

export default addMouseLayerEventProvince;
