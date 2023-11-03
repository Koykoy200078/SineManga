import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { Auth } from '../../services'
import {
	GoogleSigninButton,
	GoogleSignin,
} from '@react-native-google-signin/google-signin'

const Login = () => {
	const [email, setEmail] = useState(null)
	const [password, setPassword] = useState(null)

	useEffect(() => {}, [email, password])

	return (
		<View className='flex-1 items-center justify-center dark:bg-black'>
			<TextInput
				placeholder='Email Address'
				value={email}
				onChangeText={(val) => setEmail(val)}
			/>
			<TextInput
				placeholder='Password'
				value={password}
				onChangeText={(val) => setPassword(val)}
			/>
			<TouchableOpacity onPress={() => Auth.login(email, password)}>
				<View>
					<Text>Login</Text>
				</View>
			</TouchableOpacity>
			<GoogleSigninButton
				size={GoogleSigninButton.Size.Wide}
				color={GoogleSigninButton.Color.Dark}
				onPress={() => Auth.onGoogleButton()}
			/>
		</View>
	)
}

export default Login
