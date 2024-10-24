import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import CustomButton from '../../../components/Customebtn';
import { useGlobalSearchParams } from 'expo-router';
import { PasswordContext } from '../../../context/apicontext';
import { Ionicons } from '@expo/vector-icons';

const AddPassword = () => {
  const { user } = useGlobalSearchParams();
  const [website, setWebsite] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');
  const { handleSubmit } = useContext(PasswordContext);

  const HandleSubmit = async () => {
    if (!website || !password || !description) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    try {
      const success = await handleSubmit(website, password, description);

      if (success) {
        setWebsite('');
        setPassword('');
        setDescription('');
        Alert.alert('Success', 'Password added successfully!');
      } else {
        Alert.alert('Error', 'Failed to add password.');
      }
    } catch (error) {
      // Error handling code remains unchanged
      if (error.response && error.response.status === 400) {
        Alert.alert('Error', 'Please fill in all required fields: website, password, and description.');
      } else if (error.response && error.response.status === 404) {
        Alert.alert('Error', 'User not found. Please check if the user ID is correct.');
      } else if (error.response && error.response.status === 500) {
        Alert.alert('Server Error', 'There was an issue with the server. Please try again later.');
      } else if (error.message === 'Network Error') {
        Alert.alert('Network Error', 'Check your internet connection and try again.');
      } else {
        Alert.alert('Error', 'An unexpected error occurred. Please try again.', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Add Password</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="globe-outline" size={20} color="#6a5acd" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Website"
            value={website}
            onChangeText={setWebsite}
            placeholderTextColor="#999"
            accessibilityLabel="Website input"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#6a5acd" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#999"
            accessibilityLabel="Password input"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="information-circle-outline" size={20} color="#6a5acd" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            placeholderTextColor="#999"
            accessibilityLabel="Description input"
            multiline
            numberOfLines={4}
            scrollEnabled={true}
          />
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            title="Submit"
            onPress={HandleSubmit}
            buttonStyle={styles.submitButton}
            textStyle={styles.submitButtonText}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
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
    width: '80%',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddPassword;
