import { requestData, requestAuth, methods, privateRequest } from '@/utils/request';

export const getSimilarEstate = ({ id, recordType, current, pageSize }) =>
  requestData('/similar-records', {
    params: {
      _id: id,
      pageNumber: current,
      limit: pageSize,
      recordType,
    },
  });

  export const getSimilarEstateByCoordinates = ({ lat, lng, limit = 3, recordType  }) => requestData('/records-nearby-limit', {
    params: {
      latitude: lat,
      longitude: lng,
      limit,
      recordType
    },
  });

export const getFavoriteEstate = () => privateRequest('/estate');

export const addFavoriteEstate = (estateId, type) =>
  privateRequest('/estate', {
    method: methods.post,
    data: {
      idEstate: estateId,
      type,
    },
  });

export const deleteFavoriteEstate = (estateId) =>
  privateRequest(`/estate/${estateId}`, {
    method: methods.delete,
  });

export async function getUserEstate(payload) {
  return requestAuth(`/estate?size=6&page=${payload.page}`, {
    method: methods.get,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}
