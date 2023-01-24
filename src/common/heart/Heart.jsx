import React, { useState } from 'react'

import { ReactComponent as HeartIcon } from '../../assets/icon/HeartIcon.svg'

import './style.css'

const Heart = ({ isActive }) => {
	const [isHover, setIsHover] = useState(false)

	let fill = '#FFFFFF'

	const handleMouseEnter = () => {
		setIsHover(true)
	}

	const handleMouseLeave = () => {
		setIsHover(false)
	}

	if (isHover && !isActive) {
		fill = '#EBEBEB'
	}

	if (isActive) {
		fill = '#E55858'
	}

	return (
		<div>
			<HeartIcon
				fill={fill}
				stroke='#C4C4C4'
				strokeWidth='1'
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			/>
		</div>
	)
}

export default Heart
