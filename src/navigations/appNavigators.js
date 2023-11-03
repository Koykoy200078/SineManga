import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
	CardStyleInterpolators,
	createStackNavigator,
} from '@react-navigation/stack'

import {
	Dimensions,
	Easing,
	useColorScheme,
	Platform,
	StatusBar,
	View,
	Image,
} from 'react-native'

import auth from '@react-native-firebase/auth'

import { ROUTES } from '../configs'

import Login from '../screens/Login'
import Dashboard from '../screens/Dashboard'
import Anime from '../screens/Anime'

const options = {
	headerShown: false,
	// gestureEnabled: true,
	gestureDirections: 'horizontal',
	transitionSpec: {
		open: { animation: 'timing', duration: 300, easing: Easing },
		close: { animation: 'timing', duration: 300, easing: Easing },
	},
	cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
}

const AuthStack = createStackNavigator()
const Auth = () => {
	return (
		<AuthStack.Navigator
			initialRouteName={ROUTES.LOGIN}
			screenOptions={options}>
			<AuthStack.Screen name={ROUTES.LOGIN} component={Login} />
		</AuthStack.Navigator>
	)
}

const MainStack = createStackNavigator()
const Main = () => {
	return (
		<MainStack.Navigator
			initialRouteName={ROUTES.DASHBOARD}
			screenOptions={options}>
			<MainStack.Screen name={ROUTES.DASHBOARD} component={Dashboard} />
			<MainStack.Screen name={ROUTES.ANIME} component={Anime} />
		</MainStack.Navigator>
	)
}

export default () => {
	const [initialized, setInitialized] = useState(true)
	const [user, setUser] = useState(null)

	console.log(user)
	const isDarkMode = useColorScheme() === 'dark'

	const onAuthStateChange = (user) => {
		setUser(user)

		if (initialized) {
			setInitialized(false)
		}
	}

	useEffect(() => {
		if (Platform.OS === 'android') {
			StatusBar.setBackgroundColor(isDarkMode ? 'black' : 'white', true)
		}
		StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content', true)

		const subscriber = auth().onAuthStateChanged(onAuthStateChange)
		return subscriber
	}, [isDarkMode])

	if (initialized) {
		return null
	}

	return (
		<View style={{ flex: 1, position: 'relative' }}>
			<NavigationContainer>
				{/* {authData !== null &&
				authData !== undefined &&
				authData.token !== null &&
				error === false ? (
					<Main />
				) : (
					<Auth />
				)} */}

				{!user ? <Auth /> : <Main />}
			</NavigationContainer>
		</View>
	)
}
