import * as ActionTypes from './ActionTypes';

export const cities = (state = { errMess: null, cities: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_CITIES:
      return { ...state, errMess: null, cities: action.payload };

    case ActionTypes.CITIES_FAILED:
      return { ...state, errMess: action.payload };

    case ActionTypes.ADD_CITY:
      var city = action.payload;
      return { ...state, cities: state.cities.concat(city) }

      case ActionTypes.ADD_DAYSWEATHER:
        return { ...state, errMess: null, cities: action.payload };

        case ActionTypes.DAYSWEATHER_FAILED:
          return { ...state, errMess: action.payload };

    default:
      return state;
  }
};