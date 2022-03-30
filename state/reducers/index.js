import { combineReducers } from 'redux';
import userReducer from "./userReducer"
import cardsReducer from './cardsReducer';
import cardImageReducer from "./cardImageReducer";
import userDatabaseReducer from './userDatabaseReducer';

export default combineReducers({
  user: userReducer,
  cards: cardsReducer,
  cardImages: cardImageReducer,
  userDatabase: userDatabaseReducer,
});