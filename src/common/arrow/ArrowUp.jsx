import React, { useState } from 'react'

import { ReactComponent as ArrowUpIcon } from '../../assets/icon/ArrowUp.svg'

const ArrowUp = ({ direction }) => {
	let fill = 'rgba(65, 82, 46, 0.3)'

	if (direction === null) {
		return <ArrowUpIcon fill={fill} />
	}

	if (!direction) {
		fill = 'rgba(65, 82, 46)'
	}

	if (direction) {
		fill = 'rgba(65, 82, 46, 0.3)'
	}

	return <ArrowUpIcon fill={fill} />
}

export default ArrowUp
