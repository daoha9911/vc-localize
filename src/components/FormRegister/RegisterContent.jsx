import React, { useState, useEffect } from 'react';
// import { connect } from 'dva';
import styles from './index.less';
import FormLogin from './components/FormLogin';
import FormRegister from './components/FormRegister';
import FormNewPassword from './components/FormNewPassword';
import FormOTP from './components/FormOTP';
import FormSuccessRegister from './components/FormSuccessRegister';
import FormSuccessPassword from './components/FormSuccessPassoword';

/** component forgot password */
import FormForgotPassword from './components/ForgotPassword/FormForgotPassword';
import ForgotPasswordOTP from './components/ForgotPassword/FormOTP';
import ForgotPasswordNewPassword from './components/ForgotPassword/FormNewPassword';

const RegisterContent = ({ visible, scenario }) => {
  const [currentScenario, setCurrentScenario] = useState(scenario || 'login');

  const handleChangeScenario = (scen) => {
    setCurrentScenario(scen);
  };

  useEffect(() => {
    if (scenario === '') {
      setCurrentScenario('login');
    }
  }, [visible]);

  return (
    <>
      <div className={`${styles.flexCol} ${styles.formRegisterContent}`}>
        {visible && (
          <div className="max-w-full">
            {/* handle login */}
            {currentScenario === 'login' && (
              <FormLogin handleChangeScenario={handleChangeScenario} />
            )}

            {/* handle register  */}
            {currentScenario === 'register' && (
              <FormRegister handleChangeScenario={handleChangeScenario} />
            )}
            {currentScenario === 'otp' && <FormOTP handleChangeScenario={handleChangeScenario} />}
            {currentScenario === 'successRegister' && <FormSuccessRegister />}

            {/* handle forgot password */}
            {currentScenario === 'forgotPassword' && (
              <FormForgotPassword handleChangeScenario={handleChangeScenario} />
            )}
            {currentScenario === 'forgotPasswordOTP' && (
              <ForgotPasswordOTP handleChangeScenario={handleChangeScenario} />
            )}
            {currentScenario === 'forgotPasswordNewPassword' && (
              <ForgotPasswordNewPassword handleChangeScenario={handleChangeScenario} />
            )}

            {/* handle change password */}
            {currentScenario === 'newPassword' && (
              <FormNewPassword handleChangeScenario={handleChangeScenario} />
            )}
            {currentScenario === 'successPassword' && <FormSuccessPassword />}
          </div>
        )}
      </div>
    </>
  );
};

export default RegisterContent;
