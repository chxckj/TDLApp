import React, { useState } from 'react'
import { Text, View, TextInput, Button } from 'react-native'

const Splash = (props) => {
  const [input, setInput] = useState('')
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ colo: '#660000', fontSize: 40 }}> Splash Screen </Text>
      <TextInput placeholder='Enter your Profile' value={input} onChangeText={(value) => setInput(value)} />
      <Button title='Go to Profile' color='#000066' onPress={() => props.navigation.navigate('Profile', { username: input })} />
    </View>
  )
}
export default Splash
