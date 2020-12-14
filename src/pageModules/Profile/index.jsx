/*eslint-disable */
import React, { useState, useEffect } from 'react';
import MenuProfile from './components/Menu';
import EditInfo from './components/EditInfo';
import SaveHome from './components/SaveHome';
import { useLocation } from 'react-router';
import styles from './index.less';
const Profile = () => {
  const { query } = useLocation();

  const [currentScenario, setCurrentScenario] = useState('edit');

  useEffect(() => {
    if (query) {
      if (query?.key === 'edit') {
        setCurrentScenario('edit');
      }
      if (query?.key === 'saveHome') {
        setCurrentScenario('saveHome');
      }
      return;
    }
  }, [query]);

  const handleChangeScenario = (scen) => {
    setCurrentScenario(scen);
  };
  return (
    <>
      <div className={'flex justify-center mt-4 ' + `${styles.customWrapper}`}>
        <div className={'mr-8'}>
          <MenuProfile handleChangeScenario={handleChangeScenario} />
        </div>
        <div className={'flex justify-center'}>
          {currentScenario === 'edit' && <EditInfo />}
          {currentScenario === 'saveHome' && <SaveHome />}
        </div>
      </div>
    </>
  );
};
export default Profile;
