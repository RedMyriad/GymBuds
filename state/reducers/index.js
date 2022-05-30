import { combineReducers } from 'redux';
import userReducer from "./userReducer"
import cardsReducer from './cardsReducer';
import cardImageReducer from "./cardImageReducer";
import userDatabaseReducer from './userDatabaseReducer';
import userImagesReducer from './userImagesReducer';
import userAppInfoReducer from './userAppInfoReducer';
import userScheduleReducer from './userScheduleReducer';

export default combineReducers({
  user: userReducer,
  cards: cardsReducer,
  cardImages: cardImageReducer,
  userDatabase: userDatabaseReducer,
  userImages: userImagesReducer,
  userAppInfo: userAppInfoReducer,
  userSchedule: userScheduleReducer,
});