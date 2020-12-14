import React, { useEffect } from 'react';
import ProLayout from '@ant-design/pro-layout';
// import Authorized from '@/utils/Authorized';
import { connect } from 'umi';
import GlobalHeader from '../components/GlobalHeader';
import styles from './index.less';

const AppLayout = ({ children, settings }) => {
  useEffect(() => {
    const ggScript = document.getElementById('mapApis');
    if (!ggScript) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.UMI_APP_GOOGLE_MAP_API_KEY}&libraries=places`;
      script.id = 'mapApis';
      document.head.append(script);
    }
  }, []);
  return (
    <div>
      <ProLayout
        {...settings}
        disableMobile
        fixedHeader
        headerContentRender={() => <GlobalHeader />}
        // rightContentRender={() => <RightContent />}
      >
        <div className={styles.customLayoutChild}>{children}</div>
      </ProLayout>
    </div>
  );
};

export default connect(({ settings }) => ({
  settings,
}))(AppLayout);
