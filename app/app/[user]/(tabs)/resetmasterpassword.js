import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import CustomButton from '../../../components/Customebtn';
import { router, useGlobalSearchParams } from 'expo-router';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons'; 

const ResetMasterPassword = () => {
  const { user } = useGlobalSearchParams();
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');

  const handleSubmit = async () => { 
    if (!newPassword || !oldPassword || newPassword.length < 5) {
      Alert.alert('Error', 'Please fill in all fields and ensure the new password is at least 5 characters long.');
      return;
    }
    try {
      const response = await axios.put(`http://192.168.0.102:3000/api/users/${user}/`, {
        oldPassword,
        newPassword
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200 || response.status === 201) {
        setNewPassword('');
        setOldPassword('');
        router.push(`/`);
      } else {
        Alert.alert('Failed', 'Unable to update password. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          Alert.alert('Error', 'Please check the entered password.');
        } else if (status === 401) {
          Alert.alert('Error', 'Unauthorized. Invalid old password.');
        } else if (status === 404) {
          Alert.alert('Error', 'User not found.');
        } else {
          Alert.alert('Error', `An error occurred: ${error.response.data.message || 'Please try again.'}`);
        }
      } else if (error.request) {
        Alert.alert('Error', 'No response from server. Please check your network connection.');
      } else {
        Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      }
      console.error('Error updating password:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Reset Master Password</Text>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#6a5acd" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Old Password"
              secureTextEntry={true}
              value={oldPassword}
              onChangeText={setOldPassword}
              placeholderTextColor="#999"
              accessibilityLabel="Old Password input"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#6a5acd" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="New Master Password"
              secureTextEntry={true}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholderTextColor="#999"
              accessibilityLabel="New Master Password input"
            />
          </View>

          <View style={styles.buttonContainer}>
            <CustomButton
              title="Reset Password"
              onPress={handleSubmit}
              buttonStyle={styles.submitButton}
              textStyle={styles.submitButtonText}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  icon: {
    marginRight: 10,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#6a5acd',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '70%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ResetMasterPassword;
