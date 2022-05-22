const UPDATE_USER_APP_INFO = 'UPDATE_USER_APP_INFO';

const userAppInfoReducer = (state = {}, action) => {
    switch(action.type) {
        case UPDATE_USER_APP_INFO:
            return action.payload;
        default:
            return state;
    }
}
export default userAppInfoReducer;