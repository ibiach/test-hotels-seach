import axios from 'axios'

const baseUrl = 'https://engine.hotellook.com/api/v2/cache.json?location'
const lang = 'lang=ru'
const currency = 'currency=rub'

export const getHotels = async ({ location, checkIn, checkOut, limit = 15 }) => {
	try {
		const response = axios
			.get(
				`${baseUrl}=${location}&${lang}&${currency}&checkIn=${checkIn}&checkOut=${checkOut}&limit=${limit}`
			)
			.then(response => response.data)

		return response
	} catch (error) {
		console.log(error)
	}
}
