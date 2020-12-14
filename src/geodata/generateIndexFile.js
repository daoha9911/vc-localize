const get  = require('lodash/get');
const fs = require('fs').promises;
const path = require('path');

const indexingWithParent = (parentKey, geoData) => {
  const { features } = geoData;
  const result = {}
  features.forEach((feature) => {
    const featureParentId = get(feature, `properties.${parentKey}`);
    if (!featureParentId) {
      return;
    }
    if (Array.isArray(result[featureParentId])) {
      result[featureParentId].push(feature);
    } else {
      result[featureParentId] = [feature];
    }
  });
  return result;
}

const indexAndWriteResult = async (pathIn, pathOut, meta = {}) => {
  const rawFile = await fs.readFile(pathIn);
  const geoData = JSON.parse(rawFile);
  const { parentKey } = meta;
  const indexedGeoData = indexingWithParent(parentKey, geoData);
  const json = JSON.stringify(indexedGeoData, null, 2);
  await fs.writeFile(pathOut, json)
}

indexAndWriteResult(path.resolve(__dirname, './geojson_xa.json'), path.resolve(__dirname, './indexing_xa.json'), { parentKey: 'district_id' });

indexAndWriteResult(path.resolve(__dirname, './geojson_huyen.json'), path.resolve(__dirname, './indexing_huyen.json'), { parentKey: 'city_id' });
