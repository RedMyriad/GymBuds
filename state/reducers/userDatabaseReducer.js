const UPDATE_USER_DATABASE = 'UPDATE_USER_DATABASE';


const userDatabaseReducer = (state = [], action) => {
    switch(action.type) {
        case UPDATE_USER_DATABASE:
            return [...action.payload];
        default:
            return state;
    }
}
export default userDatabaseReducer;