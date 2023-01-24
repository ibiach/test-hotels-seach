import { call, put, takeEvery } from 'redux-saga/effects'

import { wait } from '../../helpers/helpers'
import { userAction } from '../store/user'

function* login(action) {
	const { email, password } = action.payload

	try {
		const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
		const isValidPassword = password.length >= 8

		const message = { emailError: '', passwordError: '' }

		if (!isValidEmail) {
			message.emailError = 'Некорректный email'
		}

		if (!isValidPassword) {
			message.passwordError = 'Пароль должен быть более 8 символов'
		}

		if (isValidEmail && isValidPassword) {
			yield call(wait, 1000)

			yield put(userAction.loginSuccess({ email, password }))
		} else yield put(userAction.loginError(message))
	} catch (error) {
		yield put(userAction.loginError(error))
	}
}

export function* loginWatcher() {
	yield takeEvery(userAction.login.type, login)
}
