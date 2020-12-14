/*eslint-disable */
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Pagination } from 'antd';
import { connect } from 'dva';
import styles from '../index.less';
import WrapperSaveHome from './Wrapeer';

const SaveHome = ({ dispatch, data }) => {
  const [pageRequest, setPageRequest] = useState(1);
  const getUserEstate = () => {
    dispatch({
      type: 'estate/getUserEstate',
      payload: {
        page: pageRequest,
      },
    });
  };
  useEffect(() => {
    getUserEstate();
  }, [pageRequest]);
  return (
    <>
      <Card className={styles.customCard}>
        <Row gutter={[16, 16]} justify="start">
          {data?.payload?.map((estate) => (
            <Col
              key={estate?.id}
              className={styles.customEstateComponent}
              lg={{ span: 8 }}
              xxl={{ span: 8 }}
              md={{ span: 12 }}
            >
              <div>
                <WrapperSaveHome estate={estate} favor={data?.payload} />
              </div>
            </Col>
          ))}
        </Row>
        <div className={styles.customPagination}>
          {data.total > 0 && (
            <Pagination
              current={pageRequest}
              showLessItems={true}
              showSizeChanger={false}
              responsive={true}
              pageSize={6}
              total={data.total}
              onChange={(page) => {
                setPageRequest(page);
              }}
            />
          )}
        </div>
      </Card>
    </>
  );
};
export default connect(({ estate }) => ({
  data: estate.listBookmarkEstate,
}))(SaveHome);
