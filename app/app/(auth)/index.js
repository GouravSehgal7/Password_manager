import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import CustomButton from '../../components/Customebtn';
import { Link, useRouter } from 'expo-router';
import axios from 'axios'; 


const MasterPasswordScreen = () => {

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [masterPassword, setMasterPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      valid = false;
    } else {
      setEmailError('');
    }

    if (masterPassword.length < 5) {
      setPasswordError('Password must be at least 6 characters long');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post('http://192.168.0.102:3000/api/users/checkuser', {
          email,
          password: masterPassword,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        // Alert.alert('Success', 'User created successfully');
        console.log(response.data);
        
        const userId = response.data.id;
        console.log(userId);
        
        router.push(`${userId}/(tabs)`);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            Alert.alert('Error', 'User does not exist. Please check your credentials.');
          } else if (error.response.status === 400) {
            Alert.alert('Error', 'Invalid request. Please check your input and try again.');
          } else {
            Alert.alert('Error', 'Failed to create user. Please try again.');
          }
        } else if (error.request) {
          console.log(error.request);
          
          // Alert.alert('Error', 'No response from the server. Please check your internet connection and try again.');
        } else {
          Alert.alert('Error', 'An unexpected error occurred. Please try again.');
        }
        // console.error('Error creating user:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Master Password</Text>
      <TextInput
        style={[styles.input, emailError ? styles.inputError : null]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <TextInput
        style={[styles.input, passwordError ? styles.inputError : null]}
        placeholder="Master Password"
        secureTextEntry={true}
        value={masterPassword}
        onChangeText={setMasterPassword}
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Submit"
          onPress={handleSubmit}
          buttonStyle={styles.submitButton}
          textStyle={styles.submitButtonText}
        />
      </View>
      
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          Already have an account? <Link href='/createaccount' style = {styles.linkStyle}>Click here</Link>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: '#6a5acd', 
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#777',
  },
  linkStyle: {
    color: 'blue',
    backgroundColor: 'transparent',
    textDecorationLine: 'underline',
  }
});

export default MasterPasswordScreen;
