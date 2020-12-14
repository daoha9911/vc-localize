import React, { useCallback } from 'react';
import EstateBuilding from './components/EstateBuilding';
import styles from './index.less';

const EstateBuildingMap = ({ data, setFilterRef, handleCloseMobileMap, popUpClick, type }) => {
  const handleEstateBuildingClick = useCallback(
    (id) => {
      if (setFilterRef?.current) {
        setFilterRef?.current({
          id,
        });
      }
      popUpClick?.remove();
      if (handleCloseMobileMap) {
        handleCloseMobileMap();
      }
    },
    [data],
  );

  const handleClosePopUp = useCallback(() => {
    popUpClick.remove();
    if (setFilterRef?.current) {
      setFilterRef?.current({ buildingId: null, houseId: null });
    }
  }, [data]);

  const renderEstateBuilding = useCallback(
    (buildingDatas) => {
      return buildingDatas.map((buildingData) => (
        <EstateBuilding
          key={buildingData?.id}
          handleClick={handleEstateBuildingClick}
          data={buildingData}
        />
      ));
    },
    [data],
  );

  const renderType = useCallback((esType) => {
    switch (esType) {
      case 'house':
        return 'Khu vực';
      case 'apartment':
        return 'Toà nhà';
      default:
        return 'Khu vực';
    }
  });
  return (
    <>
      {Array.isArray(data) && data.length >= 1 && (
        <div className={styles.customEstateBuilding}>
          <button className={styles.customCloseButton} onClick={handleClosePopUp} type="button">
            ×
          </button>
          <div className={styles.customEstateBuilding_OverView}>
            <h2 className={styles.customH2}>
              {data.length} nhà cần bán trong {renderType(type)} này
            </h2>
            <span className={styles.customSpan}>{data[0]?.address}</span>
          </div>
          <div className={styles.customEstateBuilding_Estates}>
            <div>{renderEstateBuilding(data)}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default EstateBuildingMap;
