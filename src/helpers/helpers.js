export const formatDays = new Intl.NumberFormat('ru', {
	style: 'unit',
	unit: 'day',
	unitDisplay: 'long',
})

export const formatDate = new Intl.DateTimeFormat('ru', {
	day: 'numeric',
	month: 'long',
	year: 'numeric',
})

export const checkIn = date => {
	const newDate = new Date(date)
	const normalizeDate = formatDate.format(newDate).slice()
	const len = normalizeDate.length

	return normalizeDate.slice(0, len - 3)
}

export const addDays = (date, days) => {
	const result = new Date(date)

	result.setDate(result.getDate() + +days)

	return result
}

export const hotelsName = num => {
	if (num > 10 && [11, 12, 13, 14].includes(num % 100)) return 'отелей'

	let last_num = num % 10

	if (last_num == 1) return 'отель'

	if ([2, 3, 4].includes(last_num)) return 'отеля'

	if ([5, 6, 7, 8, 9, 0].includes(last_num)) return 'отелей'
}

export const wait = (delay = 1000) => new Promise(resolve => setTimeout(resolve, delay))
