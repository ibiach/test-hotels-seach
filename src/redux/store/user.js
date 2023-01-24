import { createSlice } from '@reduxjs/toolkit'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = user
	? {
			user: user,
			errorMessage: '',
			isLoggedIn: true,
			isLoading: false,
	  }
	: {
			user: {},
			errorMessage: { email: '', password: '' },
			isLoggedIn: false,
			isLoading: false,
	  }

const userSlice = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {
		login(state) {
			state.isLoading = true
		},
		loginSuccess(state, action) {
			state.isLoggedIn = true
			state.isLoading = false

			state.user = action.payload
			state.errorMessage.email = ''
			state.errorMessage.password = ''

			localStorage.setItem('user', JSON.stringify(state.user))
		},
		loginError(state, action) {
			state.isLoading = false

			state.errorMessage.email = action.payload.emailError
			state.errorMessage.password = action.payload.passwordError
		},
		logout(state) {
			state.isLoggedIn = false

			localStorage.removeItem('user')
		},
	},
})

export const userAction = userSlice.actions
export default userSlice.reducer
