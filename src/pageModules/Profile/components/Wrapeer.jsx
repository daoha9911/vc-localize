import React, { useEffect } from 'react';
import { getOneEstates } from '@/pageModules/Map/services/getFilterEstates';
import { useRequest } from '@umijs/hooks';
import EstateComponent from './ProfileEstateComponent';

const WrapperSaveHome = ({ estate, favor }) => {
  const checkType = () => {
    let type = '';
    if (estate.type === 'sale_house') {
      type = 'house';
    } else {
      type = 'apartment';
    }
    return type;
  };
  const getDetailEstateRequest = useRequest(getOneEstates, {
    manual: true,
  });
  const data = getDetailEstateRequest?.data?.data;
  useEffect(() => {
    getDetailEstateRequest.run(checkType(), estate.idEstate);
  }, []);
  return (
    <div>
      <EstateComponent data={data} favorEstates={favor} />
    </div>
  );
};
export default WrapperSaveHome;
