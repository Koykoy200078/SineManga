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

const Info = ({ navigation }) => {
	const { isLoading, viewInfo, watch_current } = useSelector(
		(state) => state.anime
	)
	const { width, height } = useWindowDimensions()

	const player = useRef(null)
	const [paused, setPaused] = useState(false)
	const [isLandscape, setIsLandscape] = useState(false)

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
	}, [viewInfo, isLandscape, watch_current, route.params?.animeData])

	const getLink =
		viewInfo && viewInfo.episodes.find((item) => item.number === 1).url

	const getVideoLink =
		watch_current &&
		watch_current.sources
			.sort((a, b) => (b.quality || '') - (a.quality || ''))
			.find((item) => ['1080p', '720p'].includes(item.quality)).url

	return (
		<SafeAreaView className='flex-1 dark:bg-[#071231]'>
			{watch_current !== null ? (
				<VideoPlayer
					ref={player}
					source={{
						uri: getVideoLink,
					}}
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
				<Image
					source={{
						uri: viewInfo && viewInfo.image,
					}}
					resizeMode='contain'
					className='my-2'
					style={{
						width: width,
						height: height - width,
					}}
				/>
			)}
			{!isLandscape && (
				<View className='flex-1 p-2 bg-gray-800 rounded-t-lg'>
					<View className='flex-1 items-start' style={{ width: width - 15 }}>
						<View className='flex-row'>
							<Text className='text-sm font-bold'>Title:</Text>
							<Text className='mx-2'>{viewInfo && viewInfo.title}</Text>
						</View>
						<View className='flex-row'>
							<Text className='text-sm font-bold'>Year Release:</Text>
							<Text className='mx-2'>{viewInfo && viewInfo.releaseDate}</Text>
						</View>
						<View className='flex-row'>
							<Text className='text-sm font-bold'>Other name:</Text>
							<Text className='mx-2'>{viewInfo && viewInfo.otherName}</Text>
						</View>

						<View className='flex-row'>
							<Text className='text-sm font-bold'>Genre:</Text>
							<Text className='mx-2'>
								{viewInfo && viewInfo.genres.join(', ')}
							</Text>
						</View>
						<View className='flex-row'>
							<Text className='text-sm font-bold'>Type:</Text>
							<Text className='mx-2'>{viewInfo && viewInfo.type}</Text>
						</View>
						<View className='flex-row'>
							<Text className='text-sm font-bold'>Status:</Text>
							<Text className='mx-2'>{viewInfo && viewInfo.status}</Text>
						</View>

						<View className='flex-col'>
							<Text className='text-sm font-bold'>Description:</Text>
							<Text className='mx-4 text-justify'>
								{viewInfo && viewInfo.description}
							</Text>
						</View>
					</View>

					<View className='mt-8 space-y-2'>
						<Text className='text-bold'>Episodes</Text>
						<ScrollView horizontal>
							{viewInfo &&
								viewInfo.episodes.map((data, index) => {
									return (
										<TouchableOpacity
											key={index}
											onPress={() => dispatch(watchAnime({ id: data.id }))}>
											<View className='flex-row items-center justify-center mr-2 border border-white p-2 rounded-md'>
												<Text className='text-sm font-bold'>
													Episode # {data.number}
												</Text>
											</View>
										</TouchableOpacity>
									)
								})}
						</ScrollView>
					</View>
				</View>
			)}
		</SafeAreaView>
	)
}

export default Info
