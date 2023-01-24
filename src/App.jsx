import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

import * as ROUTES from './constants/routes.js'
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/login/LoginPage'

import './App.css'

export const ProtectedRoute = ({ user, children, redirect = '/' }) => {
	if (!user) {
		return <Navigate to={redirect} replace />
	}

	return children ? children : <Outlet />
}

const App = () => {
	const user = useSelector(state => state.userSlice.isLoggedIn)

	return (
		<Routes>
			<Route index element={<LoginPage />} />
			<Route path={ROUTES.SIGN_IN} element={<LoginPage />} />
			<Route element={<ProtectedRoute user={user} />}>
				<Route path={ROUTES.HOME} element={<HomePage />} />
			</Route>
		</Routes>
	)
}

export default App
