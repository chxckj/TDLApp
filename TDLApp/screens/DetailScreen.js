import React from 'react'
import { Text, View, Button } from 'react-native'

const Detail = (props) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: '#660000', fontSize: 40 }}>Profile Screen</Text>
      <Button title='Go to Setting' color='#000066' onPress={() => props.navigation.navigate('Settings')} />
    </View>
  )
}

Detail.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam('username')
  }
}

export default Detail
