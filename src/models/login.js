/* eslint-disable */
import {
  accountLogin,
  registerAccount,
  logoutAccount,
  activeAccount,
  getNewToken,
  resendOtp,
  forgotPassword,
  forgotPasswordVerify,
  newPassword,
  resendOtpForgotPassword,
  loginWithFacebook,
  loginWithGoogle,
  loginWithZalo,
} from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { handleFormResultNotSuccess } from '@/helpers/dvaForm';
import jwt_decode from 'jwt-decode';
import { notification } from 'antd';

const extractAuthorityAccessToken = (accessToken) => {
  let decodeToken = jwt_decode(accessToken);
  let roles = decodeToken.roles;
  let newRole = [...roles, 'user'];
  setAuthority(newRole);
};
const setItemLocalStore = (data) => {
  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
};
const removeItemLocalStore = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

let accessToken = localStorage.getItem('accessToken');
let refreshToken = localStorage.getItem('refreshToken');
let userId = 0;
let userEmail = '';
const Model = {
  namespace: 'login',
  state: {
    loggedIn: false,
    status: false,
  },
  effects: {
    *checkAuth({ _ }, { call, put }) {
      if (accessToken !== null && refreshToken !== null) {
        try {
          const decodeToken = jwt_decode(accessToken);
          if (Date.now() <= decodeToken.exp * 1000) {
            extractAuthorityAccessToken(accessToken);
            yield put({
              type: 'changeLoginStatus',
              payload: {
                loggedIn: true,
              },
            });
          } else {
            const response = yield call(getNewToken, refreshToken);
            if (response.success) {
              setItemLocalStore(response.data);
              yield put({
                type: 'changeLoginStatus',
                payload: {
                  loggedIn: true,
                },
              });
            } else {
              yield put({
                type: 'changeLoginStatus',
                payload: {
                  loggedIn: false,
                },
              });
            }
          }
        } catch (error) {
          yield put({
            type: 'changeLoginStatus',
            payload: {
              loggedIn: false,
            },
          });
        }
      } else {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            loggedIn: false,
          },
        });
      }
    },

    *login({ payload }, { call, put }) {
      try {
        const response = yield call(accountLogin, payload?.data);
        if (response.success) {
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          extractAuthorityAccessToken(response.data.accessToken);
          yield put({
            type: 'changeLoginStatus',
            payload: {
              loggedIn: true,
            },
          });
        } else {
          handleFormResultNotSuccess(response, payload);
        }
      } catch (error) {
        notification.error({
          message: 'Không thể đăng nhập, vui lòng thử lại',
        });
        yield put({
          type: 'changeStatus',
          payload: {
            status: false,
          },
        });
      }
    },

    *register({ payload }, { call, put }) {
      try {
        const response = yield call(registerAccount, payload?.data);
        if (response.success) {
          userEmail = payload.data.email;
          // localStorage.setItem('accessToken', response.data.accessToken);
          userId = response.data.id;
          if (payload.onSuccess) {
            payload.onSuccess();
          }
        } else {
          handleFormResultNotSuccess(response, payload);
        }
      } catch (error) {
        notification.error({
          message: 'Không thể đăng ký, vui lòng thử lại',
        });
      }
    },

    *active({ payload }, { call, put }) {
      try {
        const response = yield call(activeAccount, {
          id: payload.userId ? payload.userId : userId,
          code: payload.code,
        });
        // payload.onSuccess();
        if (response.success) {
          yield payload.onSuccess();
          setItemLocalStore(response.data);
        } else {
          notification.warning({
            message: 'Mã kích họat không hợp lệ, vui lòng thử lại',
          });
        }
      } catch (error) {
        notification.warning({
          message: 'Mã kích họat không hợp lệ, vui lòng thử lại',
        });
        yield put({
          type: 'changeLoginStatus',
          payload: {
            loggedIn: false,
          },
        });
      }
    },

    *logout({ payload }, { call, put }) {
      // const { redirect } = getPageQuery(); // Note: There may be security issues, please note
      const response = yield call(logoutAccount, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: {
          loggedIn: false,
        },
      });
      if (response.success) {
        removeItemLocalStore();
        localStorage.removeItem('vt-authority');
        window.location.href = '/';
      }
    },

    *resendOtp({ _ }, { call }) {
      try {
        yield call(resendOtp, {
          id: userId,
          email: userEmail,
        });
        notification.success({
          message: 'Gửi mã kích họat thành công',
        });
      } catch (error) {
        notification.error({
          message: 'Không thể gửi mã kích họat , vui lòng thử lại',
        });
      }
    },

    *forgotPassword({ payload }, { call }) {
      try {
        const response = yield call(forgotPassword, payload.data);
        if (response.success) {
          payload.onSuccess();
          userId = response.data.id;
          userEmail = payload.data.email;
        } else {
          handleFormResultNotSuccess(response);
        }
      } catch (error) {
        notification.error({
          message: 'Không thể gửi mã kích họat , vui lòng thử lại',
        });
      }
    },

    *forgotPasswordVerify({ payload }, { call }) {
      try {
        const response = yield call(forgotPasswordVerify, {
          id: userId,
          token: payload.data.token,
        });
        if (response.success) {
          payload.onSuccess();
        } else {
          notification.error({
            message: 'Mã kích họat không đúng , vui lòng thử lại',
          });
        }
      } catch (error) {
        notification.error({
          message: 'Không thể gửi mã kích họat , vui lòng thử lại',
        });
      }
    },

    *newPassword({ payload }, { call }) {
      try {
        const response = yield call(newPassword, {
          id: userId,
          newPassword: payload.data.password,
        });
        if (response.success) {
          payload.onSuccess();
        }
      } catch (error) {
        notification.error({
          message: 'Không thể gửi mã kích họat , vui lòng thử lại',
        });
      }
    },

    *resendOtpForgotPassword({ _ }, { call }) {
      try {
        const response = yield call(resendOtpForgotPassword, {
          id: userId,
          email: userEmail,
        });
        if (response.success) {
          notification.success({
            message: 'Gửi mã kích họat thành công',
          });
        }
      } catch (error) {
        notification.error({
          message: 'Không thể gửi mã kích họat , vui lòng thử lại',
        });
      }
    },

    *loginWithFacebook({ payload }, { call, put }) {
      try {
        const response = yield call(loginWithFacebook, payload);
        if (response.success) {
          setItemLocalStore(response.data);
          payload.onSuccess();
          yield put({
            type: 'changeLoginStatus',
            payload: {
              loggedIn: true,
            },
          });
        }
      } catch (error) {
        notification.error({
          message: 'Không thể đăng nhập, vui lòng thử lại',
        });
      }
    },

    *loginWithGoogle({ payload }, { call, put }) {
      try {
        const response = yield call(loginWithGoogle, payload);
        if (response.success) {
          setItemLocalStore(response.data);
          yield put({
            type: 'changeLoginStatus',
            payload: {
              loggedIn: true,
            },
          });
        } else {
          notification.error({
            message: 'Không thể đăng nhập, vui lòng thử lại',
          });
        }
      } catch (error) {
        notification.error({
          message: 'Không thể đăng nhập, vui lòng thử lại',
        });
      }
    },

    *loginWithZalo({ payload }, { call }) {
      try {
        yield call(loginWithZalo, payload);
      } catch (error) {
        notification.error({
          message: 'Không thể đăng nhập, vui lòng thử lại',
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      return { ...state, loggedIn: payload.loggedIn };
    },
    changeStatus(state, { payload }) {
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};
export default Model;
