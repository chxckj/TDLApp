import React, { Component } from 'react'
import { ActivityIndicator, NativeModules, View, LogBox } from 'react-native'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { getTheme, ThemeContext } from 'react-native-material-ui'
import * as Analytics from 'expo-firebase-analytics'
import { loadAsync } from 'expo-font'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { setCustomText } from 'react-native-global-props'
// import { activity } from './src/shared/styles'
import { activity } from './src/etc/Style'
import { initApp, initTheme } from './src/dbs/DB'

import Router from './src/router'
import tasksReducer from './src/reducers/tasks'
import listsReducer from './src/reducers/lists'
import cateReducer from './src/reducers/categories'
import themeReducer from './src/reducers/theme'
import profileReducer from './src/reducers/profile'
import settingsReducer from './src/reducers/settings'
import configReducer from './src/reducers/config'

const { UIManager } = NativeModules

const rootReducer = combineReducers({
  tasks: tasksReducer,
  lists: listsReducer,
  categories: cateReducer,
  theme: themeReducer,
  profile: profileReducer,
  settings: settingsReducer,
  config: configReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

class App extends React.Component {
  state = {
    uiTheme: false,
    ready: false,
  }

  async componentDidMount() {
    await loadAsync({
      Ubuntu: require('./src/assets/fonts/raleway/Raleway-Regular.ttf'),
    })

    // Setting default styles for all Text components.
    const customTextProps = {
      // style: { fontFamily: 'Ubuntu' },
      style: {fontFamily: 'Raleway'},
    }
    setCustomText(customTextProps)

    initApp(() => {
      initTheme((state) => {
        Analytics.logEvent('successStartedApp', {
          name: 'startedApp',
        })

        this.setState(state)
      })
    })
  }

  UNSAFE_componentWillMount() {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }

  render() {
    const { uiTheme, ready } = this.state
    // TODO: only ignore known logs
    LogBox.ignoreAllLogs(true)

    return ready ? (
      <Provider store={store}>
        <ThemeContext.Provider value={getTheme(uiTheme)}>
          <Router />
        </ThemeContext.Provider>
      </Provider>
    ) : (
      <View style={activity}>
        <ActivityIndicator size='large' color='#f4511e' />
      </View>
    )
  }
}

export default App
