const UPDATE_CARD_IMAGES = 'UPDATE_CARD_IMAGES';

const cardImageReducer = (state = [], action) => {
    switch(action.type) {
        case UPDATE_CARD_IMAGES:
            return [...action.payload];
        default:
            return state;
    }
}
export default cardImageReducer;