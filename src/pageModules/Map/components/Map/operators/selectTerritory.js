/* eslint-disable  @typescript-eslint/no-unused-vars */
import polygonCenter from '@/utils/polygonCenter.js';
import getPolygonBound from '@/utils/getPolygonBound';
import getFeatureByAdsId, { typeMaps } from '@/pageModules/Map/services/getFeatureByAdmsId';
import { colorizeProvince, colorizeDistrict } from './colorTerritory';

// ONLY FOR MAP - NOT STATE
//
//

export const decorateCity = (map, id, recordType, { getColorStops, onlyChangeType, colorType = 'price' } = {}) => {
  console.log('onlyChangeType ', onlyChangeType, colorType)
  if (!id) {
    map.setFilter('selectProvince', ['==', 'city_id', '']);
  } else {
    map.setFilter('selectProvince', ['==', 'city_id', id]);
  }
  if (!id || colorType !== 'price') {
    map.setFilter('colorDistrict', ['==', 'city_id', '']);

  } else {
    map.setFilter('colorDistrict', ['==', 'city_id', id]);

  }

  if (!id || colorType !== 'popular') {
    map.setFilter('postColorDistrict', ['==', 'city_id', '']);

  } else {
    map.setFilter('postColorDistrict', ['==', 'city_id', id]);

  }

  if (!onlyChangeType) {
    colorizeProvince(map, id, recordType, { getStops: getColorStops });
  }
};

export const selectCity = async (map, feature, e) => {
  const featureRes = await getFeatureByAdsId(typeMaps.province, feature?.properties?.city_id)
  let fullFeature = feature;
  if (featureRes.success) {
    fullFeature = featureRes.data;
  }
  map.fitBounds(getPolygonBound(fullFeature || feature));
};

export const decorateDistrict = (map, id, recordType, { getColorStops, colorType = 'price', onlyChangeType } = {}) => {
  console.log('onlyChangeType ', onlyChangeType, colorType)
  if (!id) {
    map.setFilter('selectDistrict', ['==', 'district_id', '']);
  } else {
    map.setFilter('selectDistrict', ['==', 'district_id', id]);
  }
  if (!id || !(colorType === 'price')) {
    map.setFilter('colorSubDis', ['==', 'district_id', '']);

  } else {
    map.setFilter('colorSubDis', ['==', 'district_id', id]);
  }

  if (!id || !(colorType === 'popular')) {
    map.setFilter('postColorSubDis', ['==', 'district_id', '']);

  } else {
    map.setFilter('postColorSubDis', ['==', 'district_id', id]);
  }
  if (!onlyChangeType) {
    colorizeDistrict(map, id, recordType, { getStops: getColorStops });
  }
};

export const selectDistrict = async (map, feature, e) => {
  // const center = polygonCenter(feature.geometry);
  const featureRes = await getFeatureByAdsId(typeMaps.district, feature?.properties?.district_id)
  let fullFeature = feature;
  if (featureRes.success) {
    fullFeature = featureRes.data;
  }
  map.fitBounds(getPolygonBound(fullFeature || feature), {
    speed: 0.35,
  });
};

export const decorateSubDis = (map, id) => {
  if (!id) {
    map.setFilter('selectSubDis-line', ['==', 'ward_id', '']);
    map.setFilter('selectSubDis-fill', ['==', 'ward_id', '']);
  }
  map.setFilter('selectSubDis-line', ['==', 'ward_id', id]);
  map.setFilter('selectSubDis-fill', ['==', 'ward_id', id]);
};

export const selectSubDis = async (map, feature, e) => {
  // const center = polygonCenter(feature.geometry);
  const featureRes = await getFeatureByAdsId(typeMaps.subDis, feature?.properties?.ward_id)
  let fullFeature = feature;
  if (featureRes.success) {
    fullFeature = featureRes.data;
  }
  map.fitBounds(getPolygonBound(fullFeature || feature), {
    speed: 0.35,
  });
};
