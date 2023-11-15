export function* viewLatestAnime() {
	try {
		const options = {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		}

		const response = yield fetch(
			'https://api.consumet.org/anime/gogoanime/recent-episodes',
			options
		)

		const data = yield response.json()

		if (response.ok) {
			return data
		}
	} catch (error) {
		throw new Error('An error occurred during login.')
	}
}

export function* viewPopularAnime() {
	try {
		const options = {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		}

		const response = yield fetch(
			'https://api.consumet.org/anime/gogoanime/top-airing',
			options
		)

		const data = yield response.json()

		if (response.ok) {
			return data
		}
	} catch (error) {
		throw new Error('An error occurred during login.')
	}
}

export function* viewInfoAnime(payload) {
	const { id } = payload
	try {
		const options = {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		}

		const response = yield fetch(
			'https://api.consumet.org/anime/gogoanime/info/' + id,
			options
		)

		const data = yield response.json()

		if (response.ok) {
			return data
		}
	} catch (error) {
		throw new Error('An error occurred during login.')
	}
}

export function* watchAnime(payload) {
	const { id } = payload
	try {
		const options = {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		}

		const response = yield fetch(
			'https://api.consumet.org/anime/gogoanime/watch/' + id,
			options
		)

		const data = yield response.json()

		if (response.ok) {
			return data
		}
	} catch (error) {
		throw new Error('An error occurred during login.')
	}
}
