import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	infoHotels: [],
	favoriteHotels: [],
	isLoading: false,
	errorMessage: '',
}

const hotelsSlice = createSlice({
	name: 'infoHotels',
	initialState,
	reducers: {
		requestHotels(state) {
			state.isLoading = true
		},
		responseHotelsSuccess(state, action) {
			state.infoHotels = [...action.payload]
			state.isLoading = false
		},
		responseHotelsError(state, action) {
			state.errorMessage = action.payload.errorMessage
			state.isLoading = false
		},
		addToFavorite(state, action) {
			state.favoriteHotels = [...state.favoriteHotels, action.payload]
		},
		deleteFromFavorite(state, action) {
			const newFavoriteHotels = state.favoriteHotels.filter(
				item => item.hotelId !== action.payload
			)
			state.favoriteHotels = newFavoriteHotels
		},
		filteFavoriteRating(state) {},
		filterFavoriteHotelsRating(state, action) {
			state.favoriteHotels = action.payload
		},
		filterFavoritePrice(state) {},
		filterFavoriteHotelsPrice(state, action) {
			state.favoriteHotels = action.payload
		},
	},
})

export const hotelsAction = hotelsSlice.actions
export default hotelsSlice.reducer
