/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback, useMemo } from 'react';
import qs from 'qs';
import { useLocation } from 'react-router';
import { history } from 'umi';
import _ from 'lodash';

export const useQueryLocation = () => {
  const location = useLocation();

  const filters = useMemo(() => {
    try {
      return qs.parse(location.query)?.filters || {};
    } catch (e) {
      return {};
    }
  }, [location.query]);

  const pathname = useMemo(() => {
    return location?.pathname;
  }, [location]);

  const setFilter = useCallback(
    (values) => {
      // console.log(filters, values, 'set filter', qs.stringify({
      // filters: {
      // ...filters,
      // ...values
      // }
      // }));

      filters.where = {
        ...filters.where,
        ...values,
      };

      if (values.recordType) {
        filters.where.id = null;
        filters.where.buildingId = null;
      }

      if (values.id) {
        filters.where.buildingId = null;
        filters.where.houseId = null;
      }

      if (values.buildingId) {
        filters.where.id = null;
        filters.where.houseId = null;
      }

      if (values.houseId) {
        filters.where.id = null;
        filters.where.buildingId = null;
      }

      history.push({
        search: `?${qs.stringify({
          filters: {
            ...filters,
          },
        })}`,
      });
    },
    [filters],
  );

  return {
    filters,
    setFilter,
    pathname,
  };
};

export const resetEstateFilterId = (filter) => ({
  ...filter,
  id: null,
  buildingId: null,
});
