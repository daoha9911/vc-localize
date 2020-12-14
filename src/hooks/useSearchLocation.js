import { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { history } from 'umi';
import qs from 'qs';
import { getPlaceAutoComplete, getGeocoding } from '@/services/search';
// import useHandleDataLoading from '@/pageModules/Map/components/Map/hooks/useHandleDataLoading';

const useSearchLocation = (handleSelectAddress, initialValue) => {
  const [inputValue, setInputValue] = useState(initialValue || undefined);

  const [suggestions, setSuggestions] = useState([]);

  const [loading, setLoading] = useState(false);

  // const { onLoading, onLoadDone} = useHandleDataLoading();

  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  const getSuggestion = useCallback(
    debounce(async (address) => {
      setLoading(true);
      const result = await getPlaceAutoComplete(address);
      if (result.success) {
        setSuggestions(result.data);
      } else {
        setSuggestions([]);
      }
      setLoading(false);
    }, 200),
    [],
  );

  const handleInputSelect = async (value) => {
    setInputValue(value);
    // onLoading();
    if (handleSelectAddress) {
      handleSelectAddress(value);
    } else {
      const result = await getGeocoding(value);
      if (result.success) {
        setCoordinates({ lat: result?.data?.lat, lng: result?.data?.long });
        history.push({
          pathname: 'map',
          search: `?${qs.stringify({
            filters: {
              where: {
                lat: result.data.lat,
                lng: result.data.long,
                locationName: result?.data?.address,
              },
            },
          })}`,
        });
      }
    }
  };

  const handleSubmit = useCallback(async () => {
    if (handleSelectAddress) {
      handleSelectAddress(inputValue);
    } else {
      const result = await getGeocoding(inputValue);
      if (result.success) {
        setCoordinates({ lat: result?.data?.lat, lng: result?.data?.long });
        history.push({
          pathname: 'map',
          search: `?${qs.stringify({
            filters: {
              where: {
                lat: result.data.lat,
                lng: result.data.long,
                locationName: result?.data?.address,
              },
            },
          })}`,
        });
      }
    }
  },[inputValue]);

  const handleInputChange = useCallback(
    (value) => {
      if (value) {
        setInputValue(value);
        getSuggestion(value);
      } else {
        setSuggestions([]);
        setInputValue('');
      }
    },
    [getSuggestion],
  );

  const handleSuggestionSelect = useCallback((value) => {
    if (value) {
      setInputValue(value);
      getSuggestion([]);
    }
  }, []);

  return {
    suggestions,
    handleInputChange,
    handleInputSelect,
    inputValue,
    loading,
    handleSuggestionSelect,
    handleSubmit
  };
};

export default useSearchLocation;
