import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { format } from 'date-fns'

import { Button } from '../../../common/button/Button'
import Input from '../../../common/input/Input'
import DatePickerDialog from '../../../components/datePicker/DatePicker'
import { addDays } from '../../../helpers/helpers'
import { hotelsAction } from '../../../redux/store/hotels'

import 'react-datepicker/dist/react-datepicker.css'
import styles from './style.module.css'

const SearchPanel = ({ handleChangeInfo, infoSearch }) => {
	const { location, date, days } = infoSearch

	const dispatch = useDispatch()

	const checkIn = date

	const checkOut = format(addDays(checkIn, days), 'y-MM-dd')

	useEffect(() => {
		dispatch(
			hotelsAction.requestHotels({
				location: location,
				checkIn: checkIn,
				checkOut: checkOut,
				days: days,
			})
		)
	}, [])

	const submitData = async e => {
		e.preventDefault()

		dispatch(
			hotelsAction.requestHotels({
				location: location,
				checkIn: checkIn,
				checkOut: checkOut,
				days: days,
			})
		)
	}

	return (
		<div className={styles.search}>
			<form onSubmit={submitData} className={styles.form}>
				<div className={styles.location}>
					<label htmlFor='location'>Локация</label>
					<Input
						type='text'
						name='location'
						placeholder='Москва'
						onChange={handleChangeInfo}
					/>
				</div>
				<div>
					<DatePickerDialog date={date} handleChangeInfo={handleChangeInfo} />
				</div>
				<div className={styles.days}>
					<label htmlFor=''>Количество дней</label>
					<Input type='text' name='days' placeholder='1' onChange={handleChangeInfo} />
				</div>
				<div>
					<Button type='submit'>Найти</Button>
				</div>
			</form>
		</div>
	)
}

export default SearchPanel
