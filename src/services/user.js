import { requestAuth, methods } from '@/utils/request';

export async function getUserProfile(tokenUser) {
  return requestAuth('/profile', {
    method: methods.get,
    headers: {
      Authorization: tokenUser || `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}

export async function updateUserProfile(data) {
  return requestAuth(`/profile`, {
    method: methods.post,
    data: {
      ...data,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}

export async function updatePassword(data) {
  return requestAuth('/auth/basic/changePassword', {
    method: methods.post,
    data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}

export async function getUserEstate(tokenUser) {
  return requestAuth('/estate', {
    method: methods.get,
    headers: {
      Authorization: tokenUser || `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}
