import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads'

const ENV = {
	dev: {
		BannerID: TestIds.BANNER,
	},
	prod: {
		BannerID: TestIds.APP_OPEN,
	},
}

const getEnvVars = () => {
	if (__DEV__) {
		return ENV.dev
	} else {
		return ENV.prod
	}
}

export default getEnvVars
