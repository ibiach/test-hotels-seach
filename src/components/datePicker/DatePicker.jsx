import React, { useRef, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { usePopper } from 'react-popper'
import { format } from 'date-fns'
import FocusTrap from 'focus-trap-react'

import { ReactComponent as Calendar } from '../../assets/icon/Calendar.svg'
import Input from '../../common/input/Input'

import 'react-day-picker/dist/style.css'
import styles from './style.module.css'

export default function DatePickerDialog({ date, handleChangeInfo }) {
	const [selected, setSelected] = useState()
	const [isPopperOpen, setIsPopperOpen] = useState(false)
	const [popperElement, setPopperElement] = useState(null)

	const popperRef = useRef(null)
	const buttonRef = useRef(null)

	const popper = usePopper(popperRef.current, popperElement, {
		placement: 'bottom-start',
	})

	const closePopper = () => {
		setIsPopperOpen(false)
		buttonRef?.current?.focus()
	}

	const handleButtonClick = () => setIsPopperOpen(true)

	const handleDaySelect = date => {
		setSelected(date)

		if (date) {
			handleChangeInfo(format(date, 'y-MM-dd'))
			closePopper()
		} else {
			setDate('')
		}
	}

	return (
		<div className={styles.day_picker}>
			<div ref={popperRef}>
				<label style={{ display: 'inline-block', marginBottom: '7px' }} htmlFor=''>
					Дата заселения
				</label>
				<div className={styles.input}>
					<Input
						type='text'
						readOnly='readonly'
						style={{ cursor: 'pointer' }}
						placeholder={date}
						onClick={handleButtonClick}
					/>
					<div className={styles.calendar}>
						<Calendar onClick={handleButtonClick} />
					</div>
				</div>
			</div>
			{isPopperOpen && (
				<FocusTrap
					active
					focusTrapOptions={{
						initialFocus: false,
						allowOutsideClick: true,
						clickOutsideDeactivates: true,
						fallbackFocus: buttonRef.current,
						onDeactivate: closePopper,
					}}
				>
					<div
						className={styles.popper}
						tabIndex={-1}
						{...popper.attributes.popper}
						ref={setPopperElement}
						role='dialog'
					>
						<DayPicker
							mode='single'
							initialFocus={isPopperOpen}
							defaultMonth={selected}
							selected={selected}
							onSelect={handleDaySelect}
						/>
					</div>
				</FocusTrap>
			)}
		</div>
	)
}
