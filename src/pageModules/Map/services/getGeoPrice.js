const { requestData, methods } = require('@/utils/request');

const RecordTypes = {
  house: 'house',
  apartment: 'apartment',
};

const getGeoPrice = (territoryId, administrativeType, recordType = RecordTypes.apartment) => {
  return requestData('/administrative-info', {
    method: methods.get,
    params: {
      id: territoryId,
      recordType,
      administrativeType,
    },
  });
};

export default getGeoPrice;
