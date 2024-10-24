import { View, Text,Button } from 'react-native'
import React from 'react'
import { Redirect, router } from 'expo-router'
Redirect
const Index = () => {
  return (
    <Redirect href='/(auth)/'/>
  )
}

export default Index