/* eslint-disable */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Row, Col, Select } from 'antd';
import { useQueryLocation } from '@/hooks/useQueryLocation';
import cls from 'classnames';
import ButtonPopUp from '@/components/ButtonPopUp';
import {
  convertDerectionText,
  convertContactType,
  convertRangeToCurrency,
  formattedNumber,
} from '@/utils/utils';
import { getGeocoding } from '@/services/search';
import styles from './index.less';
import PriceRangePicker from '../PriceRangePicker';
import SizePicker from '../SizePicker';
import DirectionPicker from '../DirectionPicker';
import NumBedPicker from '../NumbedPicker';
import ContactTypePicker from '../ContactTypePicker';
import useSearchLocation from '@/hooks/useSearchLocation';

const GlobalHeaderSubMenu = ({ initialValue, locatePoint }) => {
  const { filters, setFilter } = useQueryLocation();
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const locatePointRef = useRef(locatePoint);

  useEffect(() => {
    locatePointRef.current = locatePoint;
  }, [locatePoint]);

  const onInputSelect = async (value) => {
    const result = await getGeocoding(value);
    setCoordinates({ lat: result?.data?.lat, lng: result?.data?.long});
    if (
      parseFloat(filters?.where?.lng) !== result?.data?.long ||
      parseFloat(filters?.where?.lat) !== result?.data?.lat
    ) {
      setFilter({
        lat: result?.data?.lat,
        lng: result?.data?.long,
        locationName: result?.data?.address,
      });
    } else if (locatePointRef.current) {
      locatePointRef.current({ lat: result?.data?.lat, lng: result?.data?.long}, 'subDis');
    }
  };

  const { suggestions, handleInputChange, handleInputSelect, inputValue } = useSearchLocation(onInputSelect, initialValue);
  return (
    <>
      <Row gutter={[32, 0]}>
        <Col md={{ span: 6 }} lg={{ span: 6 }} xxl={{ span: 6 }}>
          <div
            className={`dinhgia-dbs-submenu_searchLocation relative ${styles.customDisplay}`}
            style={{ width: '100%' }}
          >
            <Select
              showSearch
              value={inputValue}
              onSearch={handleInputChange}
              onChange={handleInputSelect}
              filterOption={() => true}
              allowClear
              style={{
                outline: 'none',
                padding: 0,
              }}
              className={styles.searchLocation}
              placeholder="Khu vực, địa chỉ, v.v...."
              options={suggestions.map(s => ({ value: s, label: s }))}
            >
            </Select>
          </div>
        </Col>
        <Col md={{ span: 18 }} lg={{ span: 18 }} xxl={{ span: 18 }}>
          <div className={styles.customDisplay}>
            <div className={cls(styles.customDisplay, 'm-8')}>
              <ButtonPopUp
                label={
                  filters?.where?.minPrice && filters?.where?.maxPrice
                    ? `${formattedNumber(filters?.where?.minPrice)} ${convertRangeToCurrency(
                        filters?.where?.minPrice,
                      )} - ${formattedNumber(filters?.where?.maxPrice)} ${convertRangeToCurrency(
                        filters?.where?.maxPrice,
                      )}`
                    : 'Tất cả mức giá'
                }
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M19.7498 2C20.9925 2 21.9998 3.00736 21.9998 4.25V9.71196C21.9998 10.5738 21.6575 11.4003 21.0482 12.0098L12.5472 20.5129C11.2777 21.7798 9.22195 21.7807 7.95079 20.5143L3.48909 16.0592C2.21862 14.7913 2.21699 12.7334 3.48531 11.4632L11.985 2.95334C12.5946 2.34297 13.4218 2 14.2845 2H19.7498ZM19.7498 3.5H14.2845C13.82 3.5 13.3745 3.68467 13.0463 4.01333L4.53412 12.5358C3.86389 13.2207 3.86898 14.3191 4.54884 14.9977L9.01006 19.4522C9.69493 20.1345 10.8033 20.134 11.487 19.4518L19.9874 10.9492C20.3155 10.6211 20.4998 10.176 20.4998 9.71196V4.25C20.4998 3.83579 20.164 3.5 19.7498 3.5ZM16.9998 5.50218C17.8282 5.50218 18.4998 6.17374 18.4998 7.00216C18.4998 7.83057 17.8282 8.50213 16.9998 8.50213C16.1714 8.50213 15.4998 7.83057 15.4998 7.00216C15.4998 6.17374 16.1714 5.50218 16.9998 5.50218Z"
                      fill="#727C7D"
                    />
                  </svg>
                }
              >
                <PriceRangePicker />
              </ButtonPopUp>
              <ButtonPopUp
                label={
                  filters?.where?.minSize && filters?.where?.maxSize
                    ? `${filters?.where?.minSize} - ${filters?.where?.maxSize}`
                    : 'Diện tích'
                }
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M21.428 17.6892C22.1896 18.4508 22.1896 19.6898 21.428 20.4514C21.4269 20.4526 21.4257 20.4537 21.4245 20.4549L20.0881 21.7746C19.9358 21.9249 19.7375 22 19.5393 22C19.3375 22 19.1361 21.9225 18.9832 21.7678C18.6802 21.4608 18.6832 20.9661 18.9902 20.6629L19.7721 19.8906H7.23441C5.51124 19.8906 4.10941 18.4888 4.10941 16.7656V4.20901L3.32999 4.97806C3.02283 5.2811 2.52814 5.27774 2.2251 4.97058C1.92206 4.66342 1.92542 4.16873 2.23258 3.86569L3.55247 2.56366C4.3119 1.81445 5.54755 1.81445 6.30698 2.56366L7.62687 3.86569C7.93403 4.16873 7.93738 4.66342 7.63435 4.97058C7.48145 5.12546 7.27988 5.20312 7.07816 5.20312C6.87995 5.20312 6.68174 5.1282 6.52946 4.97806L5.67191 4.13196V16.7656C5.67191 17.6271 6.3729 18.3281 7.23441 18.3281H19.8513L18.9902 17.4778C18.6832 17.1746 18.68 16.6799 18.9832 16.3729C19.2864 16.066 19.7811 16.0628 20.0881 16.366L21.4245 17.6857C21.4257 17.687 21.4269 17.688 21.428 17.6892ZM19.6563 2H9.5391C9.10651 2 8.75632 2.35156 8.75785 2.78415C8.75953 3.21445 9.1088 3.5625 9.5391 3.5625H19.6563C20.0878 3.5625 20.4375 3.91223 20.4375 4.34375V14.5C20.4375 14.9303 20.7856 15.2797 21.2159 15.2812C21.6485 15.2828 22 14.9326 22 14.5V4.34375C22 3.04935 20.9507 2 19.6563 2ZM13.4844 15.3942C13.9159 15.3942 14.2657 15.0444 14.2657 14.6129V11.1357C14.2657 9.95105 13.3019 8.9873 12.1172 8.9873C11.5983 8.9873 11.1217 9.17224 10.75 9.47971C10.3783 9.17224 9.9018 8.9873 9.38285 8.9873C9.08485 8.9873 8.80073 9.04849 8.54255 9.15866C8.40354 9.0314 8.21891 8.95312 8.01566 8.95312C7.58414 8.95312 7.23441 9.30286 7.23441 9.73438V14.6172C7.23441 15.0487 7.58414 15.3984 8.01566 15.3984C8.44718 15.3984 8.79691 15.0487 8.79691 14.6172V11.1357C8.79691 10.8127 9.05982 10.5498 9.38285 10.5498C9.70588 10.5498 9.96879 10.8127 9.96879 11.1357V14.6172C9.96879 15.0487 10.3185 15.3984 10.75 15.3984C11.1816 15.3984 11.5313 15.0487 11.5313 14.6172V11.1357C11.5313 10.8127 11.7942 10.5498 12.1172 10.5498C12.4403 10.5498 12.7032 10.8127 12.7032 11.1357V14.6129C12.7032 15.0444 13.0529 15.3942 13.4844 15.3942ZM17.0293 6.21875C17.0252 6.21875 17.0212 6.21936 17.0171 6.21936C17.0132 6.21936 17.0092 6.21875 17.0051 6.21875C16.0116 6.21875 15.2032 7.02808 15.2032 8.0228C15.2032 8.45416 15.5529 8.80405 15.9844 8.80405C16.4159 8.80405 16.7657 8.45416 16.7657 8.0228C16.7657 7.89188 16.8754 7.78125 17.0051 7.78125C17.0092 7.78125 17.0132 7.78064 17.0173 7.78064C17.0212 7.78064 17.0252 7.78125 17.0293 7.78125C17.1537 7.78125 17.2596 7.88287 17.2681 8.00662C17.2527 8.06384 17.1329 8.41769 16.3843 9.24121C15.92 9.75177 15.4638 10.1676 15.4594 10.1715C15.2203 10.3885 15.1394 10.7303 15.2557 11.0314C15.3719 11.3326 15.6615 11.5312 15.9844 11.5312H18.0938C18.5253 11.5312 18.875 11.1815 18.875 10.75C18.875 10.3185 18.5253 9.96875 18.0938 9.96875H17.8251C18.5187 9.1521 18.8312 8.54434 18.8312 8.0228C18.8312 7.02808 18.0228 6.21875 17.0293 6.21875Z"
                      fill="#727C7D"
                    />
                  </svg>
                }
              >
                <SizePicker />
              </ButtonPopUp>
              <ButtonPopUp
                label={
                  filters?.where?.numBedroom ? `${filters?.where?.numBedroom} Phòng` : 'Phòng ngủ'
                }
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={17}
                    viewBox="0 0 20 17"
                    fill="none"
                  >
                    <path
                      d="M4.75 0H15.25C16.7125 0 17.9084 1.1417 17.995 2.58248L18 2.75L18.0006 6.1037C19.0968 6.414 19.9147 7.3872 19.9937 8.5628L20 8.75V16.25C20 16.6642 19.6642 17 19.25 17C18.8703 17 18.5565 16.7178 18.5068 16.3518L18.5 16.25V14H1.5V16.25C1.5 16.6297 1.21785 16.9435 0.85177 16.9932L0.75 17C0.3703 17 0.05651 16.7178 0.00685 16.3518L0 16.25V8.75C0 7.4911 0.84596 6.4297 2.00044 6.1034L2 2.75C2 1.28747 3.1417 0.0916001 4.58248 0.00502014L4.75 0ZM17.25 7.5H2.75C2.10279 7.5 1.57047 7.9919 1.50645 8.6222L1.5 8.75V12.5H18.5V8.75C18.5 8.1028 18.0081 7.5705 17.3778 7.5065L17.25 7.5ZM15.25 1.5H4.75C4.10279 1.5 3.57047 1.99187 3.50645 2.62219L3.5 2.75V6H5C5 5.44772 5.44772 5 6 5H8C8.5128 5 8.9355 5.38604 8.9933 5.88338L9 6H11C11 5.44772 11.4477 5 12 5H14C14.5128 5 14.9355 5.38604 14.9933 5.88338L15 6H16.5V2.75C16.5 2.10279 16.0081 1.57047 15.3778 1.50645L15.25 1.5Z"
                      fill="#727C7D"
                    />
                  </svg>
                }
              >
                <NumBedPicker />
              </ButtonPopUp>
              <ButtonPopUp
                label={
                  filters?.where?.direction
                    ? `${convertDerectionText(filters?.where?.direction)}`
                    : 'Hướng nhà'
                }
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={18}
                    height={20}
                    viewBox="0 0 18 20"
                    fill="none"
                  >
                    <path
                      d="M10 18C10 18 10.8934 18.0858 11.3934 18.5858C11.8934 19.0858 12 20 12 20H6C6 19.4696 6.21071 18.9609 6.58579 18.5858C6.96086 18.2107 7.46957 18 8 18V10H0.5L3 7.5L0.5 5H8V1L9 0L10 1V5H15L17.5 7.5L15 10H10V18Z"
                      fill="#807E7E"
                    />
                  </svg>
                }
              >
                <DirectionPicker />
              </ButtonPopUp>
              <ButtonPopUp
                label={
                  filters?.where?.contactType
                    ? `${convertContactType(filters?.where?.contactType)}`
                    : 'Loại liên hệ'
                }
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M17.75 2C18.9926 2 20 3.00736 20 4.25V19.7546C20 20.9972 18.9926 22.0046 17.75 22.0046H6.25C5.00736 22.0046 4 20.9972 4 19.7546V4.25C4 3.05914 4.92516 2.08436 6.09595 2.00519L6.25 2H17.75ZM18.5 16H5.5V19.7546C5.5 20.1688 5.83579 20.5046 6.25 20.5046H17.75C18.1642 20.5046 18.5 20.1688 18.5 19.7546V16ZM7.75129 17.5H16.25C16.6642 17.5 17 17.8358 17 18.25C17 18.6297 16.7178 18.9435 16.3518 18.9932L16.25 19H7.75129C7.33707 19 7.00129 18.6642 7.00129 18.25C7.00129 17.8703 7.28344 17.5565 7.64952 17.5068L7.75129 17.5H16.25H7.75129ZM17.75 3.5H6.25L6.14823 3.50685C5.78215 3.55651 5.5 3.8703 5.5 4.25V14.5H8V12.2455C8 11.5983 8.49187 11.066 9.12219 11.002L9.25 10.9955H14.75C15.3972 10.9955 15.9295 11.4874 15.9935 12.1177L16 12.2455V14.5H18.5V4.25C18.5 3.83579 18.1642 3.5 17.75 3.5ZM14.5 12.4955H9.5V14.5H14.5V12.4955ZM12 4.99552C13.3807 4.99552 14.5 6.11481 14.5 7.49552C14.5 8.87624 13.3807 9.99552 12 9.99552C10.6193 9.99552 9.5 8.87624 9.5 7.49552C9.5 6.11481 10.6193 4.99552 12 4.99552ZM12 6.49552C11.4477 6.49552 11 6.94324 11 7.49552C11 8.04781 11.4477 8.49552 12 8.49552C12.5523 8.49552 13 8.04781 13 7.49552C13 6.94324 12.5523 6.49552 12 6.49552Z"
                      fill="#727C7D"
                    />
                  </svg>
                }
              >
                <ContactTypePicker />
              </ButtonPopUp>
            </div>
            {/* <div className={styles.customDisplay}>
              <span style={{ marginRight: '10px' }}> LƯU TÌM KIẾM </span>
              <Switch />
            </div> */}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default GlobalHeaderSubMenu;
