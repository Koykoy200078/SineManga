import {
	RESET_VIEW_INFO_ANIME,
	RESET_VIEW_LATEST_ANIME,
	RESET_VIEW_POPULAR_ANIME,
	VIEW_INFO_ANIME,
	VIEW_INFO_ANIME_COMPLETED,
	VIEW_INFO_ANIME_ERROR,
	VIEW_INFO_ANIME_REQUEST,
	WATCH_ANIME_REQUEST,
	VIEW_LATEST_ANIME,
	VIEW_LATEST_ANIME_COMPLETED,
	VIEW_LATEST_ANIME_ERROR,
	VIEW_LATEST_ANIME_REQUEST,
	VIEW_POPULAR_ANIME,
	VIEW_POPULAR_ANIME_COMPLETED,
	VIEW_POPULAR_ANIME_ERROR,
	VIEW_POPULAR_ANIME_REQUEST,
	WATCH_ANIME_COMPLETED,
	WATCH_ANIME_ERROR,
	RESET_WATCH_ANIME,
	WATCH_ANIME,
} from '../api/actions'

const INITIAL_STATE = {
	isLoading: false,
	isSuccess: false,
	latest_data: null,
	popular_data: null,

	viewInfo: null,

	watch_current: null,

	error: false,
	errorMsg: null,
}

export default function reducer(state = INITIAL_STATE, action = {}) {
	console.log(action.type)
	switch (action.type) {
		// Request
		case VIEW_LATEST_ANIME_REQUEST:
			return {
				...state,
				isLoading: true,
				isSuccess: false,
				error: false,
			}

		case VIEW_POPULAR_ANIME_REQUEST:
			return {
				...state,
				isLoading: true,
				isSuccess: false,
				error: false,
			}

		case VIEW_INFO_ANIME_REQUEST:
			return {
				...state,
				isLoading: true,
				isSuccess: false,
				error: false,
			}

		case WATCH_ANIME_REQUEST:
			return {
				...state,
				isLoading: true,
				isSuccess: false,
				error: false,
			}

		// Complete
		case VIEW_LATEST_ANIME_COMPLETED:
			return {
				...state,
				isLoading: false,
				isSuccess: true,
				latest_data: action.response,
				error: false,
			}

		case VIEW_POPULAR_ANIME_COMPLETED:
			return {
				...state,
				isLoading: false,
				isSuccess: true,
				popular_data: action.response,
				error: false,
			}

		case VIEW_INFO_ANIME_COMPLETED:
			return {
				...state,
				isLoading: false,
				isSuccess: true,
				viewInfo: action.response,
				error: false,
			}

		case WATCH_ANIME_COMPLETED:
			return {
				...state,
				isLoading: false,
				isSuccess: true,
				watch_current: action.response,
				error: false,
			}

		// Error
		case VIEW_LATEST_ANIME_ERROR:
			return {
				...state,
				isLoading: false,
				isSuccess: false,
				latest_data: null,
				error: true,
				errorMsg: action.response,
			}

		case VIEW_POPULAR_ANIME_ERROR:
			return {
				...state,
				isLoading: false,
				isSuccess: false,
				popular_data: null,
				error: true,
				errorMsg: action.response,
			}

		case VIEW_INFO_ANIME_ERROR:
			return {
				...state,
				isLoading: false,
				isSuccess: false,
				viewInfo: null,
				error: true,
				errorMsg: action.response,
			}

		case WATCH_ANIME_ERROR:
			return {
				...state,
				isLoading: false,
				isSuccess: false,
				watch_current: null,
				error: true,
				errorMsg: action.response,
			}

		case RESET_VIEW_LATEST_ANIME:
			return INITIAL_STATE

		case RESET_VIEW_POPULAR_ANIME:
			return INITIAL_STATE

		case RESET_VIEW_INFO_ANIME:
			return INITIAL_STATE

		case RESET_WATCH_ANIME:
			return INITIAL_STATE

		default:
			return state
	}
}
// Latest
export const getLatestAnime = () => ({
	type: VIEW_LATEST_ANIME,
})

export const resetLatestAnime = () => ({
	type: RESET_VIEW_LATEST_ANIME,
})

// Popular
export const getPopularAnime = () => ({
	type: VIEW_POPULAR_ANIME,
})

export const resetPopularAnime = () => ({
	type: RESET_VIEW_POPULAR_ANIME,
})

// Info
export const getAnimeInfo = (payload) => ({
	type: VIEW_INFO_ANIME,
	payload,
})

export const resetAnimeInfo = () => ({
	type: RESET_VIEW_INFO_ANIME,
})

// Watch
export const watchAnime = (payload) => ({
	type: WATCH_ANIME,
	payload,
})

export const resetWatchAnime = () => ({
	type: RESET_WATCH_ANIME,
})
