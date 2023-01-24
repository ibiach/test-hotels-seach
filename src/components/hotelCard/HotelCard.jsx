import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import House from '../../assets/img/house.png'
import StarEmpty from '../../assets/img/StarEmpty.png'
import StarFill from '../../assets/img/StarFill.png'
import Heart from '../../common/heart/Heart'
import { checkIn, formatDays } from '../../helpers/helpers'
import { hotelsAction } from '../../redux/store/hotels'

import styles from './styles.module.css'

const HotelCard = ({ info, isFavorite }) => {
	const [isActive, setIsActive] = useState(false)
	const dispatch = useDispatch()

	const addToFavorite = () => {
		setIsActive(!isActive)

		if (!isActive) {
			dispatch(hotelsAction.addToFavorite(info))
		}

		if (isActive) {
			dispatch(hotelsAction.deleteFromFavorite(info.hotelId))
		}
	}

	const deleteFavorite = () => {
		setIsActive(!isActive)
		dispatch(hotelsAction.deleteFromFavorite(info.hotelId))
	}

	return (
		<div className={styles.hotel}>
			{!isFavorite && (
				<div className={styles.hotel_house}>
					<img className={styles.hotel_house_img} src={House} alt='house' />
				</div>
			)}

			<div className={styles.hotel_info}>
				<div className={styles.name}>
					<p>{info.hotelName}</p>
					<div onClick={isFavorite ? deleteFavorite : addToFavorite}>
						<Heart isActive={isFavorite ? true : isActive} />
					</div>
				</div>
				<div className={styles.date_main}>
					<p>
						{checkIn(info.checkIn)} &nbsp; — &nbsp; {formatDays.format(info.days)}
					</p>
				</div>
				<div className={styles.info}>
					<div className={styles.stars}>
						{[1, 2, 3, 4, 5].map(item => {
							return (
								<img
									key={item}
									src={info.stars >= item ? StarFill : StarEmpty}
									alt='star'
								/>
							)
						})}
					</div>
					<div className={styles.price}>
						<p className={styles.price_price}>Price:</p>
						<p className={styles.price_cost}>{info.price} ₽</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HotelCard
