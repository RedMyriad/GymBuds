export const UPDATE_USER_SCHEDULE = 'UPDATE_USER_SCHEDULE';

export const updateUserSchedule = userSchedule => (
  {
    type: UPDATE_USER_SCHEDULE,
    payload: userSchedule,
  }
);