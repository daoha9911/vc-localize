/* eslint-disable @typescript-eslint/no-unused-vars */
import { requestData, methods } from '@/utils/request';

export const getAdministrativeTypeAndId = (wardId, districtId, cityId) => {
  if (wardId) {
    return {
      administrativeType: 'ward',
      id: wardId
    }
  }
  if (districtId) {
    return {
      administrativeType: 'district',
      id: districtId
    }
  }

  if (cityId) {
    return {
      administrativeType: 'city',
      id: cityId
    }
  }

  return {}
}

export const getFilterEstates = (
  recordType = 'apartment',
  administrativeType,
  id,
  sortBy = 'time',
  order,
  pageNumber = 1,
  limit = 10,
  filterData,
) => {
  console.log(pageNumber, limit )
  if (administrativeType !== '' && id !== '') {
    return requestData('/records', {
      method: methods.post,
      params: {
        recordType,
        administrativeType,
        id,
        sortBy,
        order,
        pageNumber,
        limit,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        ...filterData,
      },
    });
  }
  return requestData('/records-by-geometry', {
    method: methods.post,
    params: {
      recordType,
      sortBy,
      order,
      pageNumber,
      limit,
    },
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      ...filterData,
    },
  });
};

export const getOneEstates = (recordType = 'apartment', _id) => {
  return requestData('/record-detail', {
    method: methods.get,
    params: {
      recordType,
      _id,
    },
  });
};

export const getAllEstatesFromId = ({ pageSize = 6, current = 0, id }) => {
  return requestData('/records-building', {
    method: methods.get,
    params: {
      _id: id,
      limit: pageSize,
      pageNumber: current,
    },
  });
};

export const getAllEstatesHouseFromId = ({ pageSize = 6, current = 0, id }) => {
  return requestData('/records-in-house-cluster', {
    method: methods.get,
    params: {
      _id: id,
      limit: pageSize,
      pageNumber: current,
    },
  });
};
