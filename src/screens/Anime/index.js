import { FlashList } from '@shopify/flash-list'
import React, { useEffect, useState, useCallback } from 'react'
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	useWindowDimensions,
	Alert,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
	getAnimeInfo,
	getLatestAnime,
	getPopularAnime,
	resetAnimeInfo,
	resetLatestAnime,
	resetPopularAnime,
	resetWatchAnime,
} from '../../apps/reducers/anime'
import { RefreshControl } from 'react-native-gesture-handler'
import { ROUTES } from '../../configs'
import { useFocusEffect } from '@react-navigation/native'

const Anime = ({ navigation, route }) => {
	const { width, height } = useWindowDimensions()
	const { isLoading, latest_data, popular_data } = useSelector(
		(state) => state.anime
	)
	const { title } = route.params
	const dispatch = useDispatch()

	const [refreshing, setRefreshing] = useState(false)
	const [isFirstRender, setIsFirstRender] = useState(true)

	const showData =
		title === 'LATEST RELEASE'
			? latest_data
			: title === 'POPULAR ANIME'
			? popular_data
			: null

	const onRefresh = useCallback(() => {
		setRefreshing(true)
		if (title === 'LATEST RELEASE') {
			dispatch(getLatestAnime())
		} else if (title === 'POPULAR ANIME') {
			dispatch(getPopularAnime())
		}
		setRefreshing(false)
	}, [title])

	useEffect(() => {
		if (isFirstRender) {
			onRefresh()
			setIsFirstRender(false)
		}
	}, [isFirstRender, onRefresh])

	useFocusEffect(
		useCallback(() => {
			onRefresh()
		}, [])
	)

	const renderItem = ({ item }) => {
		return (
			<View className='flex-1 items-center justify-center'>
				<TouchableOpacity
					onPress={() => {
						dispatch(getAnimeInfo({ id: item.id }))
						navigation.navigate(ROUTES.INFO)
					}}>
					<View
						className='rounded-tr-xl rounded-bl-xl'
						style={{
							height: 440,
							width: width - 30,
							margin: 5,
							backgroundColor: '#fff',
							shadowColor: '#000',
							shadowOffset: { width: 0, height: 2 },
							shadowOpacity: 0.25,
							shadowRadius: 3.84,
							elevation: 5,
						}}>
						<Image
							source={{
								uri: item.image,
							}}
							className='w-fit h-[350] rounded-tr-xl rounded-bl-xl'
							resizeMode='cover'
							resizeMethod='auto'
						/>

						<View className='my-1 items-center justify-center'>
							<Text
								className='text-lg font-bold text-black text-center'
								style={{ width: width - 40 }}
								ellipsizeMode='tail'
								numberOfLines={1}>
								{item.title}
							</Text>
						</View>

						<View
							style={{
								width: '100%',
								marginTop: 5,
							}}>
							<View
								style={{
									width: '100%',
									borderWidth: 1,
									borderColor: '#E5E5E5',
									borderStyle: 'dashed',
									marginTop: -2,
								}}
							/>
						</View>

						{title === 'LATEST RELEASE' && (
							<View className='flex-row flex-wrap items-center justify-center p-2 h-[50]'>
								<View className='items-center justify-center'>
									<Text className='text-base font-bold text-gray-500 mt-1'>
										Episode {item.episodeNumber}
									</Text>
								</View>
							</View>
						)}

						{title === 'POPULAR ANIME' && (
							<View className='flex-row flex-wrap items-center justify-center p-2'>
								{item.genres.map((genre, index, array) => (
									<Text
										key={index}
										className='text-sm font-bold text-gray-500 text-center'>
										{genre}
										{index < array.length - 1 && (
											<Text className='mx-2'> • </Text>
										)}
									</Text>
								))}
							</View>
						)}
					</View>
				</TouchableOpacity>
			</View>
		)
	}
	return (
		<View className='flex-1 dark:bg-[#071231]'>
			<FlashList
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
				ListHeaderComponent={
					<View className='flex-row items-center justify-between p-1'>
						<Text className='text-sm font-semibold text-gray-500'>{title}</Text>
					</View>
				}
				renderItem={renderItem}
				estimatedItemSize={160}
				data={showData && showData.results ? showData.results : []}
				// numColumns={2}
				contentContainerStyle={{
					padding: 10,
				}}
			/>
		</View>
	)
}

export default Anime
