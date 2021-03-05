import * as ActionTypes from './ActionTypes';
import { openWeatherUrl, openWeatherUrlAppId } from '../shared/openWeatherUrl';

export const fetchCities = (city) => (dispatch) => {
    return fetch(openWeatherUrl + city + openWeatherUrlAppId)
    .then(response => {
        console.log("response: " + response.text)
        if (response.ok) {
            console.log("OK");
            return response;
        } else {
            console.log("NOT OK")
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(data => dispatch(addCities(data)))
    .catch(error => dispatch(citiesFailed(error.message)));

};

export const addCities = (cities) => ({
    type: ActionTypes.ADD_CITIES,
    payload: cities
});

export const citiesFailed = (errmess) => ({
    type: ActionTypes.CITIES_FAILED,
    payload: errmess
});

export const addCity = (city) => ({
    type: ActionTypes.ADD_CITY,
    payload: city
});

export const ADD_CITIES = (weather) => ({
    type: ActionTypes.ADD_DAYSWEATHER,
    payload: weather
});