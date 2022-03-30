const UPDATE_CARD_IMAGES = 'UPDATE_CARD_IMAGES';

export const updateCardImages = cardImages => (
    {
      type: UPDATE_CARD_IMAGES,
      payload: cardImages,
    }
);