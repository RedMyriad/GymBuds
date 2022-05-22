const UPDATE_USER_IMAGES = 'UPDATE_USER_IMAGES';

export const updateUserImages = userImages => (
    {
      type: UPDATE_USER_IMAGES,
      payload: userImages,
    }
);