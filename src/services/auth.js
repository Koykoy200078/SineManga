import { Alert } from 'react-native'

import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

const login = (email, password) => {
	if (email || password) {
		return auth()
			.signInWithEmailAndPassword(email.trim(), password)
			.then(() => {
				console.log(auth().currentUser.uid)
			})
			.catch((err) => {
				if (err.code === 'auth/invalid-email') {
					Alert.alert('Error!', 'That email address is invalid!')
				}
			})
	}
}

const logout = () => {
	return auth().signOut()
}

// Social Logins
GoogleSignin.configure({
	webClientId:
		'831544503475-40ouaav3ochdilmlp51crn7es5uonkdp.apps.googleusercontent.com',
})

const onGoogleButton = async () => {
	// Check if your device supports Google Play
	await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
	// Get the users ID token
	const { idToken } = await GoogleSignin.signIn()

	// Create a Google credential with the token
	const googleCredential = auth.GoogleAuthProvider.credential(idToken)

	// Sign-in the user with the credential
	return auth().signInWithCredential(googleCredential)
}

const Auth = {
	login,
	logout,
	onGoogleButton,
}

export default Auth
