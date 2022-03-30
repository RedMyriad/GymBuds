export const UPDATE_USER_DATABASE = 'UPDATE_USER_DATABASE';

export const updateUserDatabase = userDatabase => (
  {
    type: UPDATE_USER_DATABASE,
    payload: userDatabase,
  }
);