import React from 'react'
import { View, Text } from 'react-native'

import { Provider as StoreProvider, useDispatch } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './src/apps/reducers'
import rootSaga from './src/apps/sagas'
import AppNavigators from './src/navigations/appNavigators'

const { store, persistor, runSaga } = configureStore()

runSaga(rootSaga)

const App = () => {
	return (
		<>
			<StoreProvider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<AppNavigators />
				</PersistGate>
			</StoreProvider>
		</>
	)
}

export default App
