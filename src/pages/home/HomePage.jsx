import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns'

import Logout from '../../assets/icon/Logout.svg'
import { hotelsAction } from '../../redux/store/hotels'
import { userAction } from '../../redux/store/user'

// import { dataAction } from '../../redux/store/fetchData'
import FavoritePanel from './favoritePanel/FavoritePanel'
import MainPanel from './mainPanel/MainPanel'
import SearchPanel from './searchPanel/SearchPanel'

import styles from './style.module.css'

const HomePage = () => {
	const [infoSearch, setInfoSearch] = useState({
		location: 'Москва',
		date: format(new Date(), 'y-MM-dd'),
		days: '1',
	})

	const handleChangeInfo = e => {
		if (typeof e === 'string') {
			setInfoSearch({ ...infoSearch, date: e })
		} else setInfoSearch({ ...infoSearch, [e.target.name]: e.target.value })
	}

	const dispatch = useDispatch()

	const handleLogout = () => dispatch(userAction.logout())

	return (
		<div>
			<header className={styles.header}>
				<p>Simple Hotel Check</p>
				<div className={styles.logout} onClick={handleLogout}>
					<p>Выйти</p>
					<img src={Logout} alt='Logout' />
				</div>
			</header>

			<div className={styles.container}>
				<div className={styles.aside_panel}>
					<SearchPanel handleChangeInfo={handleChangeInfo} infoSearch={infoSearch} />
					<FavoritePanel />
				</div>
				<MainPanel infoSearch={infoSearch} />
			</div>
		</div>
	)
}

export default HomePage
