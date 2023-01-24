import createSagaMiddleware from '@redux-saga/core'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { all } from 'redux-saga/effects'

import { fetchHotelsWatcher } from '../saga/sagaHotels'
import { loginWatcher } from '../saga/sagaUser'

import hotelsSlice from './hotels'
import userSlice from './user'

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({ hotelsSlice: hotelsSlice, userSlice: userSlice })

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware),
})

function* rootSaga() {
	yield all([fetchHotelsWatcher(), loginWatcher()])
}

sagaMiddleware.run(rootSaga)
