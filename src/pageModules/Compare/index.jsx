import React, { useState, useCallback, useMemo } from 'react';
import cls from 'classnames';
import { Row, Col, Pagination } from 'antd';
import { connect } from 'dva';
import CompareDetail from './components/CompareDetail';
import CompareHeader from './components/CompareHeader';
import BreadCrumbFooter from './components/BreadCrumbFooter';
import styles from './index.less';

const Compare = ({ compareEstate }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const renderCompareDetail = useCallback(
    (compareEstateIds) => {
      return compareEstateIds.map((estate) => (
        <Col key={estate?.id} span={6}>
          <CompareDetail id={estate?.id} type={estate?.type} />
        </Col>
      ));
    },
    [compareEstate],
  );

  const convertCompareEstate = useMemo(() => {
    return compareEstate?.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  }, [currentPage, compareEstate]);

  const handlePaginationChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className={`${styles.Compare_Wrapper} w1200`}>
        <div className={styles.Compare_Quote}>
          <h2>So sánh bất động sản của tôi</h2>
        </div>
        <div className={cls(styles.Compare_Quote_Mobile, 'flex items-center')}>
          <div className="mr-4">
            <svg
              width={16}
              te
              height={16}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z" fill="#002C34" />
            </svg>
          </div>
          <h2>So sánh bất động sản của tôi</h2>
        </div>
        <div className={styles.Compare_Web}>
          {Array.isArray(compareEstate) && compareEstate.length >= 1 ? (
            <>
              <Row>
                <Col span={5} offset={1}>
                  <CompareHeader />
                </Col>
                {compareEstate && renderCompareDetail(convertCompareEstate)}
              </Row>
              <div className="flex mt-4 justify-center">
                <Pagination
                  onChange={handlePaginationChange}
                  total={compareEstate.length}
                  pageSize={pageSize}
                />
              </div>
            </>
          ) : (
            <span>Không có BDS cần so sánh</span>
          )}
        </div>
      </div>
      <div className={styles.Compare_Mobile}>
        <h2>Đây là bản mobile</h2>
      </div>
      <div className={styles.Compare_Footer}>
        <BreadCrumbFooter />
      </div>
    </>
  );
};

export default connect(({ compare }) => ({
  compareEstate: compare.estates,
}))(Compare);
