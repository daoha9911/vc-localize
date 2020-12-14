import { resetEstateFilterId } from '@/hooks/useQueryLocation';
import { selectDistrict } from '../../operators/selectTerritory';

const onDistrictMouseMove = (e, map) => {
  console.log('on district mousemove');
  const feature = e.features[0];
  map.setFilter('highlightDistrict', ['==', 'district_id', feature?.properties?.district_id]);
};

const checkIfDirectDistrictClick = (event, map) => {
  const sourceLayers = map.queryRenderedFeatures(event.point);
  return (
    sourceLayers[0]?.source === 'districtTerritory' || sourceLayers[0]?.source === 'priceDistrict'
  );
};

const onDistrictClick = (event, map, { onSelectDis, setFilterRef, onLoading }) => {
  if (!checkIfDirectDistrictClick(event, map)) {
    return;
  }

  if(onLoading){
    onLoading();
  }
  /* eslint-disable-next-line react-hooks/rules-of-hooks */
  if (setFilterRef?.current){
    setFilterRef.current(
      resetEstateFilterId({
        currentDis: event.features[0]?.properties?.district_id,
        locationName: `${
          event.features[0]?.properties?.district_name
            ? event.features[0]?.properties?.district_name
            : ''
        },${
          event.features[0]?.properties?.city_name ? event.features[0]?.properties?.city_name : ''
        }`,
      }),
    );
  }
  const feature = event.features[0];
  selectDistrict(map, feature, event);
  onSelectDis({ dis: feature?.properties?.district_id, province: feature?.properties?.city_id });
};

export const toggleMouseLayerEventDistrict = (status, map, handleEvent = {}) => {
  const { onSelectDis, setFilterRef, onLoading } = handleEvent;

  if (map) {
    if (status === 0) {
      map.off('mousemove', 'district', (e) => {
        onDistrictMouseMove(e, map, { onSelectDis, setFilterRef });
      });
      // map.off('dblclick', 'tinh', this.onTinhMouseDown);
      map.off('click', 'district', (e) => {
        onDistrictClick(e, map);
      });
      // map.off('mouseleave', 'tinh', this.onTinhMouseLeave);
    } else {
      map.on('mousemove', 'district', (e) => {
        onDistrictMouseMove(e, map);
      });
      // map.off('dblclick', 'tinh', this.onTinhMouseDown);
      map.on('click', 'district', (e) => {
        onDistrictClick(e, map, { onSelectDis, setFilterRef, onLoading });
      });
    }
  }
};

const addMouseLayerEventDistrict = (map, handleEvent = {}) => {
  toggleMouseLayerEventDistrict(1, map, handleEvent);
};

export default addMouseLayerEventDistrict;
