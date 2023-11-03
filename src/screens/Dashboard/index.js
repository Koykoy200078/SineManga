import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Auth } from '../../services'
import { FlashList } from '@shopify/flash-list'
import auth from '@react-native-firebase/auth'
import { ROUTES } from '../../configs'
const Dashboard = ({ navigation }) => {
	const dshboardData = [
		{
			id: 1,
			name: 'Anime',
			nav: ROUTES.ANIME,
		},
		{
			id: 2,
			name: 'Movie',
			nav: ROUTES.ANIME,
		},
		{
			id: 3,
			name: 'Comics',
			nav: ROUTES.ANIME,
		},
		{
			id: 4,
			name: 'Manga',
			nav: ROUTES.ANIME,
		},
		{
			id: 5,
			name: 'Light Novels',
			nav: ROUTES.ANIME,
		},
		{
			id: 6,
			name: 'News',
			nav: ROUTES.ANIME,
		},
	]
	return (
		<View className='flex-1 dark:bg-black'>
			<FlashList
				ListHeaderComponent={
					<View className='flex-1 flex-row items-center justify-between mb-10'>
						<Text className='text-base font-bold'>Welcome Back 😉</Text>
						<TouchableOpacity onPress={() => Auth.logout()}>
							<View>
								<Text className='text-sm font-bold'>LOGOUT</Text>
							</View>
						</TouchableOpacity>
					</View>
				}
				renderItem={({ item }) => {
					return (
						<View className='flex-1 p-2 items-center justify-center'>
							<TouchableOpacity onPress={() => navigation.navigate(item.nav)}>
								<View className='border border-red-600 rounded-md w-36 h-34 rounded-t-md items-center justify-center'>
									{/* <Image
										source={{
											uri: 'https://www.picserver.org/assets/library/2020-10-31/originals/example1.jpg',
										}}
										className='w-36 h-34 rounded-t-md'
										resizeMode='cover'
									/> */}
									<Text className='text-lg font-bold'>{item.name}</Text>
								</View>
							</TouchableOpacity>
						</View>
					)
				}}
				estimatedItemSize={160}
				data={dshboardData}
				numColumns={2}
				contentContainerStyle={{
					padding: 10,
				}}
			/>
		</View>
	)
}

export default Dashboard
