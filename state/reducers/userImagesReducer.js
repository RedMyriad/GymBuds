const UPDATE_USER_IMAGES = 'UPDATE_USER_IMAGES';

const userImageReducer = (state = [], action) => {
    switch(action.type) {
        case UPDATE_USER_IMAGES:
            return [...action.payload];
        default:
            return state;
    }
}
export default userImageReducer;