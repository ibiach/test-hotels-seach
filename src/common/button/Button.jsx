import React from 'react'
import ReactLoading from 'react-loading'
import { useSelector } from 'react-redux'

import './style.css'

export const Button = ({ children, ...otherProps }) => {
	const loading = useSelector(state => state.userSlice.isLoading)

	return (
		<button className='btn' {...otherProps}>
			{loading ? (
				<ReactLoading
					className='loader'
					type={'balls'}
					color={'#ffffff'}
					height={'12%'}
					width={'12%'}
				/>
			) : (
				children
			)}
		</button>
	)
}
