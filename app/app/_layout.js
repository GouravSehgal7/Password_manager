import { View, Text } from 'react-native'
import React from 'react'
import { Stack, useGlobalSearchParams } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PasswordProvider } from '../context/apicontext'


const Mainlayout = () => {
  const { user } = useGlobalSearchParams();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <PasswordProvider user={user}>
      <Stack>
        <Stack.Screen name='index' options={{headerShown:false}}/>
        <Stack.Screen name='(auth)' options={{headerShown:false}}/>
        <Stack.Screen name='[user]/(tabs)' options={{headerShown:false}}/>
      </Stack>
    </PasswordProvider>
    </GestureHandlerRootView>
  )
}

export default Mainlayout