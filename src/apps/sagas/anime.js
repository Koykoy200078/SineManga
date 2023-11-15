import { put, call, takeEvery } from 'redux-saga/effects'
import {
	VIEW_INFO_ANIME,
	VIEW_INFO_ANIME_COMPLETED,
	VIEW_INFO_ANIME_ERROR,
	VIEW_INFO_ANIME_REQUEST,
	VIEW_LATEST_ANIME,
	VIEW_LATEST_ANIME_COMPLETED,
	VIEW_LATEST_ANIME_ERROR,
	VIEW_LATEST_ANIME_REQUEST,
	VIEW_POPULAR_ANIME,
	VIEW_POPULAR_ANIME_COMPLETED,
	VIEW_POPULAR_ANIME_ERROR,
	VIEW_POPULAR_ANIME_REQUEST,
	WATCH_ANIME,
	WATCH_ANIME_COMPLETED,
	WATCH_ANIME_ERROR,
	WATCH_ANIME_REQUEST,
} from '../api/actions'

import { viewLatestAnime, viewPopularAnime, viewInfoAnime, watchAnime } from '../api/anime'

export function* viewLatestAnimeAsync(action) {
	yield put({ type: VIEW_LATEST_ANIME_REQUEST })

	try {
		const response = yield call(viewLatestAnime, action.payload)

		if (response && response.message) {
			yield put({ type: VIEW_LATEST_ANIME_ERROR, response })
		} else {
			yield put({ type: VIEW_LATEST_ANIME_COMPLETED, response })
		}
	} catch (error) {
		yield put({ type: VIEW_LATEST_ANIME_ERROR, error })
	}
}

export function* view_LatestAnime() {
	yield takeEvery(VIEW_LATEST_ANIME, viewLatestAnimeAsync)
}

// Popular
export function* viewPopularAnimeAsync(action) {
	yield put({ type: VIEW_POPULAR_ANIME_REQUEST })

	try {
		const response = yield call(viewPopularAnime, action.payload)

		if (response && response.message) {
			yield put({ type: VIEW_POPULAR_ANIME_ERROR, response })
		} else {
			yield put({ type: VIEW_POPULAR_ANIME_COMPLETED, response })
		}
	} catch (error) {
		yield put({ type: VIEW_POPULAR_ANIME_ERROR, error })
	}
}

export function* view_PopularAnime() {
	yield takeEvery(VIEW_POPULAR_ANIME, viewPopularAnimeAsync)
}

// Info
export function* viewInfoAnimeAsync(action) {
	yield put({ type: VIEW_INFO_ANIME_REQUEST })

	try {
		const response = yield call(viewInfoAnime, action.payload)

		if (response && response.message) {
			yield put({ type: VIEW_INFO_ANIME_ERROR, response })
		} else {
			yield put({ type: VIEW_INFO_ANIME_COMPLETED, response })
		}
	} catch (error) {
		yield put({ type: VIEW_INFO_ANIME_ERROR, error })
	}
}

export function* view_InfoAnime() {
	yield takeEvery(VIEW_INFO_ANIME, viewInfoAnimeAsync)
}

// Watch
export function* watchAnimeAsync(action) {
	yield put({ type: WATCH_ANIME_REQUEST })

	try {
		const response = yield call(watchAnime, action.payload)

		if (response && response.message) {
			yield put({ type: WATCH_ANIME_ERROR, response })
		} else {
			yield put({ type: WATCH_ANIME_COMPLETED, response })
		}
	} catch (error) {
		yield put({ type: WATCH_ANIME_ERROR, error })
	}
}

export function* watch_CurrentAnime() {
	yield takeEvery(WATCH_ANIME, watchAnimeAsync)
}
