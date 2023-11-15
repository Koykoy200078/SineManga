import { all } from 'redux-saga/effects'

import {
	view_LatestAnime,
	view_PopularAnime,
	view_InfoAnime,
	watch_CurrentAnime,
} from './anime'

export default function* rootSaga() {
	yield all([
		view_LatestAnime(),
		view_PopularAnime(),
		view_InfoAnime(),
		watch_CurrentAnime(),
	])
}
