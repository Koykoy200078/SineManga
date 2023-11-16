import {
	View,
	Text,
	Image,
	ScrollView,
	TouchableOpacity,
	useWindowDimensions,
	Alert,
	StatusBar,
	SafeAreaView,
} from 'react-native'
import React, {
	useContext,
	useEffect,
	useState,
	useRef,
	useCallback,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import VideoPlayer from 'react-native-video-controls'
import Orientation, {
	OrientationLocker,
	PORTRAIT,
	LANDSCAPE,
} from 'react-native-orientation-locker'
import {
	getLatestAnime,
	getPopularAnime,
	resetAnimeInfo,
	resetWatchAnime,
	watchAnime,
} from '../../apps/reducers/anime'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import { IMAGES } from '../../configs'

import FastImage from 'react-native-fast-image'

const Info = ({ navigation }) => {
	const { isLoading, viewInfo, watch_current } = useSelector(
		(state) => state.anime
	)
	const { width, height } = useWindowDimensions()

	const player = useRef(null)
	const [paused, setPaused] = useState(false)
	const [isLandscape, setIsLandscape] = useState(false)
	const [title, setTitle] = useState('Episode #1')

	const route = useRoute()
	const dispatch = useDispatch()
	const animeData = route.params?.animeData

	useFocusEffect(
		useCallback(() => {
			return () => {
				dispatch(resetAnimeInfo())
				dispatch(resetWatchAnime())
			}
		}, [route.params?.animeData])
	)

	useEffect(() => {
		StatusBar.setHidden(isLandscape)
	}, [title, viewInfo, isLandscape, watch_current, route.params?.animeData])

	// const getLink =
	// 	viewInfo && viewInfo.episodes.find((item) => item.number === 1).url

	const getVideoLink =
		watch_current &&
		watch_current.sources
			.sort((a, b) => (b.quality || '') - (a.quality || ''))
			.find((item) => ['1080p', '720p', '480p', '360p'].includes(item.quality))
			.url

	return (
		<SafeAreaView className='flex-1 dark:bg-[#071231]'>
			{watch_current !== null ? (
				<VideoPlayer
					key={title}
					ref={player}
					source={{
						uri: getVideoLink,
					}}
					title={title}
					tapAnywhereToPause={true}
					onHideControls
					controlTimeout={1000}
					paused={paused}
					resizeMode='contain'
					isFullscreen={isLandscape}
					toggleResizeModeOnFullscreen={false}
					style={{ flex: 1, width: width }}
					videoStyle={{ flex: 1 }}
					onBack={() => {
						navigation.goBack()
						if (animeData === 'LATEST RELEASE') {
							dispatch(getLatestAnime())
						} else if (animeData === 'POPULAR ANIME') {
							dispatch(getPopularAnime())
						}
					}}
					onEnd={() => setPaused(true)}
					onError={(err) => console.log('Error: ', err)}
					onEnterFullscreen={() => {
						Orientation.lockToLandscape()
						// player.current.presentFullscreenPlayer()
						setIsLandscape(true)
					}}
					onExitFullscreen={() => {
						Orientation.lockToPortrait()
						// player.current.dismissFullscreenPlayer()
						setIsLandscape(false)
					}}
				/>
			) : (
				<FastImage
					source={{
						uri: viewInfo && viewInfo.image,
						priority: FastImage.priority.high,
					}}
					resizeMode={FastImage.resizeMode.cover}
					style={{
						width: width,
						height: 250,
					}}
				/>
			)}
			{!isLandscape && (
				<ScrollView>
					<View style={{ flex: 1, padding: 5, backgroundColor: '#071231' }}>
						<View
							style={{
								width: width - 30,
								// backgroundColor: '#fff',
								borderRadius: 10,
								padding: 10,
							}}>
							<Text
								className='text-center'
								style={{ fontSize: 20, fontWeight: 'bold' }}>
								{viewInfo && viewInfo.title}
							</Text>

							<View className='flex-row items-center justify-center'>
								<Text
									className='text-center'
									style={{ fontSize: 16, marginHorizontal: 5 }}>
									{viewInfo && viewInfo.releaseDate} •
								</Text>
								<Text style={{ fontSize: 16 }}>
									{viewInfo && viewInfo.status}
								</Text>
							</View>

							<View
								style={{
									height: 1,
									backgroundColor: '#D1D5DB',
									marginVertical: 5,
								}}
							/>

							<Text style={{ fontSize: 16 }}>
								{viewInfo && viewInfo.otherName}
							</Text>
							<Text style={{ fontSize: 16 }}>
								{viewInfo && viewInfo.genres.join(', ')}
							</Text>
							<Text style={{ fontSize: 16 }}>{viewInfo && viewInfo.type}</Text>

							<Text style={{ fontSize: 16 }}>
								{viewInfo && viewInfo.description}
							</Text>
						</View>

						<View style={{ marginTop: 10 }}>
							<Text
								style={{
									fontSize: 18,
									fontWeight: 'bold',
									marginVertical: 10,
								}}>
								Episodes
							</Text>
							<ScrollView horizontal>
								{viewInfo &&
									viewInfo.episodes.map((data, index) => {
										return (
											<TouchableOpacity
												key={index}
												onPress={async () => {
													setTitle('Episode #' + data.number)
													dispatch(watchAnime({ id: data.id }))
												}}>
												<View
													style={{
														flexDirection: 'row',
														alignItems: 'center',
														justifyContent: 'center',
														marginRight: 10,
														borderWidth: 1,
														// borderColor: '#fff',
														padding: 10,
														borderRadius: 10,
													}}>
													<Text style={{ fontSize: 16, fontWeight: 'bold' }}>
														Episode # {data.number}
													</Text>
												</View>
											</TouchableOpacity>
										)
									})}
							</ScrollView>
						</View>
					</View>
				</ScrollView>
			)}
		</SafeAreaView>
	)
}

export default Info
