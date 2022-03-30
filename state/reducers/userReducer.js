import { UPDATE_USER } from '../actions/user';

const initialState = {
    user: {}
};

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_USER:
        return action.payload;
        default:
            return state;
    }
}
export default userReducer;