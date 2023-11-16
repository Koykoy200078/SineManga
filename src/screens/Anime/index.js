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
import { IMAGES, ROUTES } from '../../configs'
import { useFocusEffect } from '@react-navigation/native'

import FastImage from 'react-native-fast-image'

const Anime = ({ navigation, route }) => {
	const { width, height } = useWindowDimensions()
	const { isLoading, latest_data, popular_data, viewInfo } = useSelector(
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

	useEffect(() => {
		if (viewInfo) {
			navigation.navigate(ROUTES.INFO)
		} else {
			Alert.alert('Not available')
		}
	}, [viewInfo])

	useFocusEffect(
		useCallback(() => {
			onRefresh()
		}, [])
	)

	// const renderItem = ({ item }) => {
	// 	return (
	// 		<View className='flex-1 items-center justify-center'>
	// 			<TouchableOpacity
	// 				onPress={() => {
	// 					dispatch(getAnimeInfo({ id: item.id }))
	// 					navigation.navigate(ROUTES.INFO)
	// 				}}>
	// 				<View
	// 					style={{
	// 						flex: 1,
	// 						alignItems: 'center',
	// 						justifyContent: 'center',
	// 						margin: 10,
	// 					}}>
	// 					<View className='bg-gray-500 rounded-md overflow-hidden'>
	// 						<View style={{ height: 180, width: 155, overflow: 'hidden' }}>
	// 							<FastImage
	// 								source={{ uri: item ? item.image : IMAGES.DEFAULT_IMAGE }}
	// 								className='w-full h-[220] rounded-tr-xl rounded-bl-xl'
	// 								resizeMode={FastImage.resizeMode.cover}
	// 							/>
	// 						</View>
	// 						<View
	// 							className='flex-1 p-2 items-center justify-center'
	// 							style={{ width: 155 }}>
	// 							<View className='items-center justify-center h-[40]'>
	// 								<Text
	// 									className='text-center'
	// 									ellipsizeMode='tail'
	// 									numberOfLines={2}>
	// 									{item.title}
	// 								</Text>
	// 							</View>
	// 							<View
	// 								style={{
	// 									width: '100%',
	// 									marginTop: 5,
	// 								}}>
	// 								<View className='w-full border border-gray-400 border-dashed mt-[-2]' />
	// 							</View>
	// 							{title === 'LATEST RELEASE' && (
	// 								<Text className='p-1'>Episode {item.episodeNumber}</Text>
	// 							)}

	// 							{title === 'POPULAR ANIME' && (
	// 								<View className='flex-row flex-wrap items-center justify-center p-2'>
	// 									{item.genres.map((genre, index, array) => (
	// 										<Text key={index} className='p-1'>
	// 											{genre}
	// 											{index < array.length - 1 && (
	// 												<Text className='mx-2'> • </Text>
	// 											)}
	// 										</Text>
	// 									))}
	// 								</View>
	// 							)}
	// 						</View>
	// 					</View>
	// 				</View>
	// 			</TouchableOpacity>
	// 		</View>
	// 	)
	// }

	const renderItem = ({ item }) => {
		return (
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					padding: 10,
				}}>
				<TouchableOpacity
					onPress={async () => {
						dispatch(getAnimeInfo({ id: item.id }))
					}}>
					<View
						className='bg-gray-500'
						style={{
							borderRadius: 10,
							overflow: 'hidden',
							elevation: 5,
							height: 270,
						}}>
						<FastImage
							source={{
								uri: item ? item.image : IMAGES.DEFAULT_IMAGE,
								priority: FastImage.priority.high,
							}}
							style={{ height: 180, width: 155 }}
							resizeMode={FastImage.resizeMode.cover}
						/>
						<View style={{ padding: 10 }}>
							<Text
								style={{
									fontSize: 16,
									fontWeight: 'bold',
									textAlign: 'center',
								}}
								numberOfLines={2}>
								{item.title}
							</Text>
							<View
								style={{
									height: 1,
									backgroundColor: '#D1D5DB',
									marginVertical: 5,
								}}
							/>
							{title === 'LATEST RELEASE' && (
								<Text style={{ textAlign: 'center' }}>
									Episode {item.episodeNumber}
								</Text>
							)}
							{title === 'POPULAR ANIME' && (
								<View
									style={{
										flexDirection: 'row',
										flexWrap: 'wrap',
										justifyContent: 'center',
									}}>
									{item.genres.map((genre, index, array) => (
										<Text key={index} style={{ margin: 2 }}>
											{genre}
											{index < array.length - 1 && ' • '}
										</Text>
									))}
								</View>
							)}
						</View>
					</View>
				</TouchableOpacity>
			</View>
		)
	}

	return (
		<View className='flex-1 dark:bg-[#071231]'>
			<FlashList
				showsVerticalScrollIndicator={false}
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
				numColumns={2}
				contentContainerStyle={{
					padding: 10,
				}}
			/>
		</View>
	)
}

export default Anime
