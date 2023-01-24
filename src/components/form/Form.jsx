import React from 'react'
import { useSelector } from 'react-redux'

import { Button } from '../../common/button/Button'
import Input from '../../common/input/Input'

import styles from './style.module.css'

const Form = ({ getInfoUser, loginSubmit }) => {
	const errorMessage = useSelector(state => state.userSlice.errorMessage)

	const { email, password } = errorMessage

	return (
		<div className={styles.container}>
			<div>Simple Hotel Check</div>
			<form className={styles.form} onSubmit={loginSubmit}>
				<div className={email ? `${styles.input_error}` : `${styles.input}`}>
					<label className={styles.label} htmlFor='email'>
						Логин
					</label>
					<Input type='text' name='email' onChange={getInfoUser} />
					<p className={styles.errorMessage}>{email}</p>
				</div>
				<div className={password ? `${styles.input_error}` : `${styles.input}`}>
					<label className={styles.label} htmlFor='password'>
						Пароль
					</label>
					<Input type='password' name='password' onChange={getInfoUser} />
					<p className={styles.errorMessage}>{password}</p>
				</div>
				<div>
					<Button type='submit'>Войти</Button>
				</div>
			</form>
		</div>
	)
}

export default Form
