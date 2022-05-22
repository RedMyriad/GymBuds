export const UPDATE_USER_APP_INFO = 'UPDATE_USER_APP_INFO';

export const updateUserAppInfo = userInfo => (
  {
    type: UPDATE_USER_APP_INFO,
    payload: userInfo,
  }
);