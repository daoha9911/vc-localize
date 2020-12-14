import { methods, requestAuth } from '@/utils/request';

/**
 * basic login with username and password
 */
export async function accountLogin({ username, password }) {
  return requestAuth(`/auth/basic`, {
    method: methods.post,
    data: {
      username,
      password,
    },
  });
}
/**
 * register new account with data
 */
export async function registerAccount(data) {
  return requestAuth('/auth/register', {
    method: methods.post,
    data: {
      ...data,
    },
  });
}
/**
 * active account register with code active
 */
export async function activeAccount(payload) {
  return requestAuth('/auth/register/active', {
    method: methods.post,
    data: {
      ...payload,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}

/**
 * logout account
 */
export async function logoutAccount(refreshToken) {
  return requestAuth('/auth/logout', {
    method: methods.post,
    data: {
      refreshToken,
    },
  });
}

export async function changePassword(data, tokenUser) {
  return requestAuth('/auth/basic/password', {
    method: methods.post,
    data: {
      ...data,
    },
    headers: {
      Authorization: tokenUser,
    },
  });
}

export async function forgotPassword(data) {
  return requestAuth('/auth/basic/forgotPassword', {
    method: methods.post,
    data: {
      ...data,
    },
  });
}

export async function forgotPasswordVerify(data) {
  return requestAuth('/auth/basic/forgotPasswordVerify', {
    method: methods.post,
    data: {
      ...data,
    },
  });
}

export async function newPassword(data) {
  return requestAuth('/auth/basic/newPassword', {
    method: methods.post,
    data: {
      ...data,
    },
  });
}

export async function loginWithGoogle(data) {
  return requestAuth('/auth/google', {
    method: methods.post,
    data,
  });
}

export async function loginWithFacebook(data) {
  return requestAuth('/auth/facebook', {
    method: methods.post,
    data,
  });
}

export async function loginWithZalo(data) {
  return requestAuth('/auth/zalo', {
    method: methods.post,
    data: {
      ...data,
    },
  });
}

export async function getNewToken(refreshToken) {
  return requestAuth('/auth/token', {
    method: methods.post,
    data: {
      refreshToken,
    },
  });
}

export async function resendOtp(data) {
  return requestAuth('/auth/register/resendToken', {
    method: methods.post,
    data: {
      ...data,
    },
  });
}

export async function resendOtpForgotPassword(data) {
  return requestAuth('/auth/basic/resendTokenPassword', {
    method: methods.post,
    data: {
      ...data,
    },
  });
}
