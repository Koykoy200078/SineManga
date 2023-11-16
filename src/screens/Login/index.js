import React, { useState, useEffect } from 'react'
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Image,
} from 'react-native'
import { Auth } from '../../services'
import {
	GoogleSigninButton,
	GoogleSignin,
} from '@react-native-google-signin/google-signin'
import { IMAGES } from '../../configs'

const Login = () => {
	const [email, setEmail] = useState(null)
	const [password, setPassword] = useState(null)

	useEffect(() => {}, [email, password])

	// container: {
	// 	flex: 1,
	// 	justifyContent: 'center',
	// 	alignItems: 'center',
	// 	padding: 16,
	// },
	return (
		<View className='flex-1 p-4 space-y-1 dark:bg-[#071231] items-center justify-center'>
			<Image style={styles.logo} source={IMAGES.LOGO} />
			<Text style={styles.title}>Welcome Back!</Text>
			<TextInput
				style={styles.input}
				placeholder='Email Address'
				value={email}
				onChangeText={(val) => setEmail(val)}
			/>
			<TextInput
				style={styles.input}
				placeholder='Password'
				value={password}
				onChangeText={(val) => setPassword(val)}
				secureTextEntry
			/>
			<TouchableOpacity
				style={styles.button}
				onPress={() => Auth.login(email, password)}>
				<Text style={styles.buttonText}>Log In</Text>
			</TouchableOpacity>

			<GoogleSigninButton
				size={GoogleSigninButton.Size.Wide}
				color={GoogleSigninButton.Color.Dark}
				onPress={() => Auth.onGoogleButton()}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 16,
	},
	logo: {
		width: 180,
		height: 180,
		marginBottom: 48,
		borderRadius: 10,
	},
	title: {
		fontSize: 24,
		marginBottom: 24,
	},
	input: {
		width: '100%',
		height: 50,
		paddingHorizontal: 8,
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 4,
		marginBottom: 16,
	},
	button: {
		width: '100%',
		height: 50,
		backgroundColor: '#1e90ff',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
	},
})

export default Login
