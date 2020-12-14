import axios from 'axios';
import { request as createRequest } from '@/utils/request';
import { GEOCODING_URL } from '@/constants';

const geoAxios = axios.create({
  baseURL: GEOCODING_URL
})

const geoRequest = createRequest(geoAxios);

export const getPlaceAutoComplete = address => geoRequest('/address-autocomplete', {
  params: {
    address
  }
})

export const getGeocoding = address => geoRequest('/address-geocoding', {
  params: {
    address
  }
})
