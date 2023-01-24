/* eslint-disable react/no-children-prop */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollingCarousel } from '@trendyol-js/react-carousel'

import img1 from '../../../assets/img/img1.png'
import img2 from '../../../assets/img/img2.png'
import img3 from '../../../assets/img/img3.png'
import HotelCard from '../../../components/hotelCard/HotelCard'
import { checkIn, hotelsName } from '../../../helpers/helpers'

import styles from './style.module.css'

const Images = () => {
	const images = [
		{ url: img1, description: 'first image' },
		{ url: img2, description: 'second image' },
		{ url: img3, description: 'third image' },
		{ url: img1, description: 'first image' },
		{ url: img2, description: 'second image' },
		{ url: img3, description: 'third image' },
		{ url: img1, description: 'first image' },
	]

	return (
		<div>
			{images.map((item, index) => {
				return (
					<img
						style={{ width: '164px', height: '149px' }}
						key={index}
						src={item.url}
						alt={item.description}
					/>
				)
			})}
		</div>
	)
}

const MainPanel = ({ infoSearch, ...otherProps }) => {
	const [hotels, setHotels] = useState([])

	const { date } = infoSearch

	const dispatch = useDispatch()
	const infoHotels = useSelector(state => state.hotelsSlice.infoHotels)
	const favoriteHotels = useSelector(state => state.hotelsSlice.favoriteHotels)

	const getInfoHotels = async () => {
		return await new Promise(res => {
			res(infoHotels)
		})
	}

	useEffect(() => {
		getInfoHotels().then(data => setHotels(data))
	}, [infoHotels, dispatch])

	return (
		<div className={styles.results}>
			<header className={styles.header}>
				<div className={styles.hotels}>
					<p>Отели</p>
					<p>-</p>
					<p>{hotels[0]?.location}</p>
				</div>
				<div className={styles.date}>
					<p>{checkIn(date)}</p>
				</div>
			</header>

			<ScrollingCarousel className={styles.carousel} children={<Images />} />

			<div className={styles.favorite_title}>
				Добавлено в Избранное: {favoriteHotels.length} {hotelsName(favoriteHotels.length)}
			</div>

			<div className={styles.hotels_main}>
				{infoHotels.map((item, index) => {
					return <HotelCard key={index} info={item} {...otherProps} />
				})}
			</div>
		</div>
	)
}

export default MainPanel
