import React from 'react'
import { Text, View, Button } from 'react-native'

const Settings = (props) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: '#660000', fontSize: 40 }}>Setting Screen</Text>
      <Button title='Go to Home' color='#000066' onPress={() => props.navigation.navigate('Splash')} />
    </View>
  )
}

export default Settings
