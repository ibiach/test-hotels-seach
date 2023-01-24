import { call, put, takeEvery } from 'redux-saga/effects'

import { wait } from '../../helpers/helpers'
import { getHotels } from '../../service/HotelSevice'
import { hotelsAction } from '../store/hotels'

function* fetchHotels(action) {
	try {
		const response = yield call(getHotels, action.payload)

		const filteredResponse = response.map(item => ({
			hotelName: item.hotelName,
			hotelId: item.hotelId,
			location: item.location.name,
			price: item.priceAvg,
			stars: item.stars,
			checkIn: action.payload.checkIn,
			days: action.payload.days,
		}))

		console.log(filteredResponse)

		yield put(hotelsAction.responseHotelsSuccess(filteredResponse))
	} catch (error) {
		yield put(hotelsAction.responseHotelsError(filteredResponse))
	}
}

function* filterFavoriteRating(action) {
	if (action.payload.typeSort === 'up') {
		const filteredFavorite = [...action.payload.state].sort((a, b) => b.stars - a.stars)
		yield put(hotelsAction.filterFavoriteHotelsRating(filteredFavorite))
	} else {
		const filteredFavorite = [...action.payload.state].sort((a, b) => a.stars - b.stars)
		yield put(hotelsAction.filterFavoriteHotelsRating(filteredFavorite))
	}
}

function* filterFavoritePrice(action) {
	if (action.payload.typeSort === 'up') {
		const filteredFavorite = [...action.payload.state].sort((a, b) => b.price - a.price)
		yield put(hotelsAction.filterFavoriteHotelsPrice(filteredFavorite))
	} else {
		const filteredFavorite = [...action.payload.state].sort((a, b) => a.price - b.price)
		yield put(hotelsAction.filterFavoriteHotelsPrice(filteredFavorite))
	}
}

export function* fetchHotelsWatcher() {
	yield takeEvery(hotelsAction.requestHotels.type, fetchHotels)
	yield takeEvery(hotelsAction.filteFavoriteRating.type, filterFavoriteRating)
	yield takeEvery(hotelsAction.filterFavoritePrice.type, filterFavoritePrice)
}
