import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import CustomButton from '../../components/Customebtn';
import { Link, router } from 'expo-router';
import axios from 'axios'; 


const CreateAccount = () => {
 
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [masterPassword, setMasterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
    } else if (masterPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      valid = false;
    } else {
      setPasswordError('');
    }
    return valid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post('http://192.168.0.102:3000/api/users/', {
          username,
          email,
          password: masterPassword,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        // Alert.alert('Success', 'User created successfully');
        // console.log(response.data);
        
        const user = response.data.id;    
        router.push(`${user}/(tabs)`);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            Alert.alert('Error', 'User with this email already exists.');
          } else if (error.response.status === 500) {
            Alert.alert('Error', 'Server error. Please try again later.');
          } else {
            Alert.alert('Error', 'Failed to create user. Please try again.');
          }
        } else if (error.request) {
          // Alert.alert('Error', 'No response from the server. Please check your connection.');
          console.log(error.request);
          
        } else {
          Alert.alert('Error', 'An error occurred. Please try again.');
        }
      }
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        style={[styles.input]}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
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
      <TextInput
        style={[styles.input, passwordError ? styles.inputError : null]}
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
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
          Already have an account? <Link href='/' style = {styles.linkStyle}>Click here</Link>
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
    width: '100%', 
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
    width: '100%', 
  },
  submitButton: {
    backgroundColor: '#6a5acd', 
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  linkStyle: {
    color: 'blue',
    backgroundColor: 'transparent',
    textDecorationLine: 'underline',
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
});

export default CreateAccount;
