import React, { useState } from 'react'

import { ReactComponent as ArrowDownIcon } from '../../assets/icon/ArrowDown.svg'

const ArrowDown = ({ direction }) => {
	let fill = 'rgba(65, 82, 46, 0.3)'

	if (direction === null) {
		return <ArrowDownIcon fill={fill} />
	}

	if (!direction) {
		fill = 'rgba(65, 82, 46, 0.3)'
	}

	if (direction) {
		fill = 'rgba(65, 82, 46)'
	}

	return <ArrowDownIcon fill={fill} />
}

export default ArrowDown
