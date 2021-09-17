/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
// import { createAppContainer } from 'react-navigation'
// import { createStackNavigator } from 'react-navigation-stack'
// import SplashScreen from './screens/SplashScreen'
// import DetailScreen from './screens/DetailScreen'
// import SettingScreen from './screens/SettingScreen'
import { SafeAreaView, StyleSheet, Text } from 'react-native'

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello World</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default App

// const AppNavigator = createStackNavigator({
//   Splash: SplashScreen,
//   Detail: DetailScreen,
//   Setting: SettingScreen
// }, {
//   defaultNavigationOptions: {
//     headerStyle: {
//       backgroundColor: '#000000'
//     },
//     headerTintColor: '#FFF'
//   }
// })
// const Navigator = createAppContainer(AppNavigator)

// export default function App () {
//   return (
//     <Navigator>
//       <SplashScreen />
//     </Navigator>
//   )
// }
