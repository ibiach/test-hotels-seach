import React, { useState } from 'react'

import './style.css'

const Input = ({ ...otherProps }) => {
	return <input className='input' {...otherProps} />
}

export default Input
