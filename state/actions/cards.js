const UPDATE_CARDS = 'UPDATE_CARDS';

export const updateCards = cards => (
    {
      type: UPDATE_CARDS,
      payload: cards,
    }
);