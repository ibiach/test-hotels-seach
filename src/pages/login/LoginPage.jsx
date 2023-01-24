import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import Form from '../../components/form/Form'
import { userAction } from '../../redux/store/user'

import './style.css'

const LoginPage = () => {
	const [userInfo, setUserInfo] = useState({
		email: '',
		password: '',
	})

	const { email, password } = userInfo

	const dispatch = useDispatch()
	const isLoggedIn = useSelector(state => state.userSlice.isLoggedIn)

	if (isLoggedIn || localStorage.getItem('user')) {
		return <Navigate to='/home' replace />
	}

	const getInfoUser = e => {
		setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
	}

	const loginSubmit = e => {
		e.preventDefault()

		dispatch(userAction.login({ email, password }))
	}

	return (
		<div className='wrapper'>
			<Form getInfoUser={getInfoUser} loginSubmit={loginSubmit} />
		</div>
	)
}

export default LoginPage
