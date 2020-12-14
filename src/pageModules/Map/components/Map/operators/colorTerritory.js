import get from 'lodash/get';
import getGeoPrice from '@/pageModules/Map/services/getGeoPrice';
import getHuyenFeatures from '@/pageModules/Map/services/getHuyenFeatures';
import getXaFeatures from '@/pageModules/Map/services/getXaFeatures';
import administrativeType from '@/modelDefs/administrativeTypes';
import { sortedUniq, orderBy } from 'lodash';

const defaultColorRange = [
  '#00e691',
  '#085',
  '#5eff4d',
  '#13be00',
  '#c1ff80',
  '#75e100',
  '#84ff00',
  '#4f9900',
  '#e7ff99',
  '#aee500',
  '#759900',
  '#f1ff99',
  '#e7ff4d',
  '#dfff00',
  '#fff831',
  '#999400',
  '#ffe14d',
  '#ffd500',
  '#ffe0b3',
  '#ffa51f',
  '#ffe2cc',
  '#ffa866',
  '#ff9a4d',
  '#ff7b16',
  '#cc5800',
  '#ffb5b3',
  '#ff8480',
  '#ff0a02',
  '#ff4d4d',
  '#c80000',
];

const mergePriceWithFeatures = (features, info, featureIdKey) => {
  return features.map((feature) => {
    const id = get(feature, ['properties', featureIdKey]);
    console.log('merge price id ', id);
    const matchInfo = info.find((i) => i.id === id);
    if (!matchInfo) {
      return {
        ...feature,
        properties: {
          ...feature?.properties,
          ppm2_mean: 0,
          num_records: 0,
        },
      };
    }
    return {
      ...feature,
      properties: {
        ...feature?.properties,
        ppm2_mean: matchInfo?.ppm2_mean,
        min: matchInfo?.min,
        max: matchInfo?.max,
        num_records: matchInfo?.num_records,
      },
    };
  });
};

const generateStops = (colorRange = defaultColorRange, priceRange = []) => {
  const redColorRange = [...colorRange].reverse();
  const uniqOrderedPriceRange = sortedUniq(orderBy(priceRange)).reverse();
  const stops = uniqOrderedPriceRange.map((price, index) => {
    if (index >= redColorRange.length - 1) {
      return [price, redColorRange[redColorRange.length - 1]];
    }
    return [price, redColorRange[index]];
  });

  return {
    result: stops.reverse(),
    meta: {
      min: uniqOrderedPriceRange.slice(-1)[0],
      max: uniqOrderedPriceRange[0],
    },
  };
};

export const colorizeProvince = async (map, provinceId, recordType, { getStops } = {}) => {
  const features = await getHuyenFeatures(provinceId);
  const info = await getGeoPrice(provinceId, administrativeType.city, recordType);
  // console.log('prices ', prices);
  if (
    !info.success ||
    !Array.isArray(info.data) ||
    !features.success ||
    !Array.isArray(features.data)
  ) {
    return;
  }
  const featureWithColors = mergePriceWithFeatures(features.data, info.data, 'district_id');
  const priceStops = generateStops(
    defaultColorRange,
    info.data.map((p) => p.ppm2_mean),
  );

  const postStops = generateStops(
    defaultColorRange,
    info.data.map((p) => p.num_records),
  );
  if (getStops) {
    getStops({
      price: priceStops,
      popular: postStops,
    });
  }

  // console.log('stops ', stops);
  map.getSource('infoDistrict')?.setData({
    type: 'FeatureCollection',
    features: featureWithColors,
  });

  map.setPaintProperty('colorDistrict', 'fill-color', {
    property: 'ppm2_mean',
    stops: priceStops.result,
  });
  map.setPaintProperty('postColorDistrict', 'fill-color', {
    property: 'num_records',
    stops: postStops.result,
  });
};

export const colorizeDistrict = async (map, districtId, recordType, { getStops } = {}) => {
  const features = await getXaFeatures(districtId);
  const info = await getGeoPrice(districtId, administrativeType.district, recordType);
  // console.log('prices ', prices);
  if (
    !info.success ||
    !Array.isArray(info.data) ||
    !features.success ||
    !Array.isArray(features.data)
  ) {
    return;
  }
  const featureWithColors = mergePriceWithFeatures(features.data, info.data, 'ward_id');
  const priceStops = generateStops(
    defaultColorRange,
    info.data.map((p) => p.ppm2_mean),
  );
  const postStops = generateStops(
    defaultColorRange,
    info.data.map((p) => p.num_records),
  );
  if (getStops) {
    getStops({
      price: priceStops,
      popular: postStops,
    });
  }
  map.getSource('infoSubDis')?.setData({
    type: 'FeatureCollection',
    features: featureWithColors,
  });
  map.setPaintProperty('colorSubDis', 'fill-color', {
    property: 'ppm2_mean',
    stops: priceStops.result,
  });
  map.setPaintProperty('postColorSubDis', 'fill-color', {
    property: 'num_records',
    stops: postStops.result,
  });
};
