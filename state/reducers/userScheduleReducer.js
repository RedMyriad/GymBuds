const UPDATE_USER_SCHEDULE = 'UPDATE_USER_SCHEDULE';

const userScheduleReducer = (state = [], action) => {
    switch(action.type) {
        case UPDATE_USER_SCHEDULE:
            return [...action.payload];
        default:
            return state;
    }
}
export default userScheduleReducer;