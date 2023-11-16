import React, { useState, useEffect, useCallback } from 'react'
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	TextInput,
	ScrollView,
	Alert,
	RefreshControl,
	useWindowDimensions,
} from 'react-native'
import { Auth } from '../../services'
import { FlashList } from '@shopify/flash-list'
import auth from '@react-native-firebase/auth'
import { IMAGES, ROUTES } from '../../configs'
import ADS from '../../ads/config'

const { BannerID } = getEnvVars()

import {
	BannerAd,
	BannerAdSize,
	GAMBannerAd,
	TestIds,
} from 'react-native-google-mobile-ads'
import { Icons } from '../../configs/icons'
import { useDispatch, useSelector } from 'react-redux'
import {
	getLatestAnime,
	getPopularAnime,
	resetAnimeInfo,
	resetLatestAnime,
	resetPopularAnime,
	resetWatchAnime,
} from '../../apps/reducers/anime'
import { useFocusEffect } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import getEnvVars from '../../../env'

const Dashboard = ({ navigation }) => {
	const { width, height } = useWindowDimensions()

	const dispatch = useDispatch()
	const { isLoading, latest_data, popular_data } = useSelector(
		(state) => state.anime
	)

	const [refreshing, setRefreshing] = useState(false)

	const onRefresh = useCallback(() => {
		setRefreshing(true)
		dispatch(getLatestAnime())
		dispatch(getPopularAnime())
	}, [])

	useFocusEffect(
		useCallback(() => {
			dispatch(getLatestAnime())
			dispatch(getPopularAnime())

			return () => {
				dispatch(resetLatestAnime())
				dispatch(resetPopularAnime())
				dispatch(resetAnimeInfo())
				dispatch(resetWatchAnime())
			}
		}, [])
	)

	useEffect(() => {
		if (!isLoading && latest_data && popular_data) {
			setRefreshing(false)
		} else {
			// onRefresh()
		}
	}, [latest_data, popular_data])

	const dshboardData = [
		{
			id: 1,
			name: 'Anime',
			icon: IMAGES.ANIME,
			nav: ROUTES.ANIME,
		},
		// {
		// 	id: 2,
		// 	name: 'Movie',
		// 	icon: IMAGES.MOVIE,
		// 	nav: ROUTES.ANIME,
		// },
		// {
		// 	id: 3,
		// 	name: 'Comics',
		// 	icon: IMAGES.ANIME,
		// 	nav: ROUTES.ANIME,
		// },
		{
			id: 4,
			name: 'Manga',
			icon: IMAGES.ANIME,
			nav: ROUTES.ANIME,
		},
		// {
		// 	id: 5,
		// 	name: 'Light Novels',
		// 	icon: IMAGES.LIGHTNOVEL,
		// 	nav: ROUTES.ANIME,
		// },
		// {
		// 	id: 6,
		// 	name: 'News',
		// 	icon: IMAGES.ANIME,
		// 	nav: ROUTES.ANIME,
		// },
	]

	const renderHeader = () => {
		return (
			<View className='p-2'>
				<View className='space-y-2 w-full'>
					<View className='flex-row items-center justify-between'>
						<View className='space-y-1'>
							<Text className='text-sm font-bold'>Good Evening 🌜</Text>
							<Text
								className='text-lg font-bold'
								ellipsizeMode='tail'
								numberOfLines={1}>
								{auth().currentUser.displayName}
							</Text>
						</View>
						<TouchableOpacity
							onPress={() => {
								Alert.alert('Logout?', 'Are you sure you want to logout?', [
									{
										text: 'Yes',
										onPress: () => Auth.logout(),
									},
								])
							}}>
							<View>
								<Image
									source={{
										uri: auth().currentUser.photoURL,
									}}
									resizeMode='contain'
									className='w-14 h-14 rounded-full'
								/>
							</View>
						</TouchableOpacity>
					</View>

					<View className='flex-row items-center justify-evenly border border-gray-500 rounded-md'>
						<TextInput placeholder='Search...' className='w-[85%]' />

						<Icons.Ionicons name='search' size={20} color='#FFFFFF' />
					</View>
				</View>

				<ScrollView horizontal className='mt-2'>
					{dshboardData.map((item, index) => (
						<TouchableOpacity key={index}>
							<View className='items-center justify-center w-28 border border-gray-500 mr-2 rounded-md p-1'>
								<Text className='text-base font-bold'>{item.name}</Text>
							</View>
						</TouchableOpacity>
					))}
				</ScrollView>
			</View>
		)
	}

	const renderLatestAnimeItem = ({ item }) => {
		return (
			<View className='flex-1 p-2 mt-1 items-center justify-center h-[220]'>
				<TouchableOpacity onPress={() => null}>
					<FastImage
						source={{
							uri: item ? item.image : IMAGES.DEFAULT_IMAGE,
							priority: FastImage.priority.high,
						}}
						className='w-[160] h-[220] rounded-tr-xl rounded-bl-xl'
						resizeMode={FastImage.resizeMode.contain}
					/>
				</TouchableOpacity>
			</View>
		)
	}

	const renderPopularAnimeItem = ({ item }) => {
		return (
			<View className='flex-1 p-2 mt-1 items-center justify-center h-[220]'>
				<TouchableOpacity onPress={() => null}>
					<FastImage
						source={{
							uri: item ? item.image : IMAGES.DEFAULT_IMAGE,
							priority: FastImage.priority.high,
						}}
						className='w-[160] h-[220] rounded-tr-xl rounded-bl-xl'
						resizeMode={FastImage.resizeMode.contain}
					/>
				</TouchableOpacity>
			</View>
		)
	}

	return (
		<View className='flex-1 dark:bg-[#071231]'>
			{renderHeader()}
			<ScrollView
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
				style={{
					height: height,
				}}>
				<View className='flex-1 w-full h-fit'>
					<FlashList
						ListHeaderComponent={
							<View className='flex-row items-center justify-between mt-[-10]'>
								<Text className='font-semibold text-gray-500'>
									Latest Anime
								</Text>
								<TouchableOpacity
									onPress={() =>
										navigation.navigate(ROUTES.ANIME, {
											title: 'LATEST RELEASE',
										})
									}>
									<Text className='font-bold text-pink-600'>View All</Text>
								</TouchableOpacity>
							</View>
						}
						renderItem={renderLatestAnimeItem}
						estimatedItemSize={160}
						showsVerticalScrollIndicator={false}
						data={latest_data ? latest_data.results.slice(0, 2) : dshboardData}
						numColumns={2}
						contentContainerStyle={{
							padding: 10,
						}}
					/>
				</View>

				<View className='flex-1 w-full h-fit'>
					<FlashList
						ListHeaderComponent={
							<View className='flex-row items-center justify-between mt-[-10]'>
								<Text className='font-semibold text-gray-500'>
									Popular Anime
								</Text>
								<TouchableOpacity
									onPress={() =>
										navigation.navigate(ROUTES.ANIME, {
											title: 'POPULAR ANIME',
										})
									}>
									<Text className='font-bold text-pink-600'>View All</Text>
								</TouchableOpacity>
							</View>
						}
						renderItem={renderPopularAnimeItem}
						estimatedItemSize={160}
						showsVerticalScrollIndicator={false}
						data={
							popular_data ? popular_data.results.slice(0, 2) : dshboardData
						}
						numColumns={2}
						contentContainerStyle={{
							padding: 10,
						}}
					/>
				</View>
			</ScrollView>

			<BannerAd
				unitId={BannerID}
				size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
				requestOptions={{
					requestNonPersonalizedAdsOnly: true,
				}}
			/>
		</View>
	)
}

export default Dashboard
