import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import StarEmpty from '../../../assets/img/StarEmpty.png'
import StarFill from '../../../assets/img/StarFill.png'
import ArrowDown from '../../../common/arrow/ArrowDown'
import ArrowUp from '../../../common/arrow/ArrowUp'
import Heart from '../../../common/heart/Heart'
import HotelCard from '../../../components/hotelCard/HotelCard'
import { checkIn, formatDays } from '../../../helpers/helpers'
import { hotelsAction } from '../../../redux/store/hotels'

import styles from './style.module.css'

const FavoritePanel = ({ ...otherProps }) => {
	const [directionRating, setDirectionRating] = useState(null)
	const [directionPrice, setDirectionPrice] = useState(null)
	const [typeSort, setTypeSort] = useState('up')

	const dispatch = useDispatch()
	const favoriteHotels = useSelector(state => state.hotelsSlice.favoriteHotels)

	const toggleShowRatingFilter = () => {
		dispatch(hotelsAction.filteFavoriteRating({ typeSort: typeSort, state: favoriteHotels }))

		setDirectionPrice(null)

		if (typeof directionRating === 'boolean') {
			setDirectionRating(!directionRating)
		} else {
			setDirectionRating(false)
			setTypeSort('up')
		}

		if (typeSort === 'up') {
			setTypeSort('down')
		} else setTypeSort('up')
	}
	const toggleShowPriceFilter = () => {
		dispatch(hotelsAction.filterFavoritePrice({ typeSort: typeSort, state: favoriteHotels }))

		setDirectionRating(null)

		if (typeof directionPrice === 'boolean') {
			setDirectionPrice(!directionPrice)
		} else {
			setDirectionPrice(false)
			setTypeSort('up')
		}

		if (typeSort === 'up') {
			setTypeSort('down')
		} else setTypeSort('up')
	}

	return (
		<div className={styles.favorite}>
			<p>Избранное</p>

			<div className={styles.search}>
				<div
					className={`${styles.filter} ${styles.filter_rating}`}
					onClick={toggleShowRatingFilter}
				>
					<p>Рейтинг</p>
					<div className={styles.arrows}>
						<p>
							<ArrowUp direction={directionRating} />
						</p>
						<p>
							<ArrowDown direction={directionRating} />
						</p>
					</div>
				</div>
				<div
					className={`${styles.filter} ${styles.filter_cost}`}
					onClick={toggleShowPriceFilter}
				>
					<p>Цена</p>
					<div className={styles.arrows}>
						<p>
							<ArrowUp direction={directionPrice} />
						</p>
						<p>
							<ArrowDown direction={directionPrice} />
						</p>
					</div>
				</div>
			</div>

			<div className={styles.hotels}>
				{favoriteHotels.map((item, index) => {
					return <HotelCard key={index} isFavorite={true} info={item} {...otherProps} />
				})}
			</div>
		</div>
	)
}

export default FavoritePanel
