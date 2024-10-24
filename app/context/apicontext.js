import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Alert } from 'react-native';
import { router } from 'expo-router';
export const PasswordContext = createContext();

export const PasswordProvider = ({ children, user }) => {
  const [passwordData, setPasswordData] = useState();
  const [loading, setLoading] = useState(false);

  const fetchPasswords = async (user) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://192.168.0.102:3000/api/passwords/${user}`);
      if (response.data && Array.isArray(response.data.data)) {
        setPasswordData(response.data.data);
      }
    } catch (error) {
      console.log('Error fetching passwords:', error);
      Alert.alert('Error', 'Failed to fetch passwords. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (website, password, description) => {
    setLoading(true);
    try {
      const response = await axios.post(`http://192.168.0.102:3000/api/passwords/${user}/`, {
        website,
        password,
        details: description,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201) {
        setPasswordData((prevData) => [...prevData, response.data.newPassword]);
        // console.log("New password added:", response.data.newPassword);
        return true; 
      } else {
        Alert.alert('Error', 'Failed to add password. Please try again.');
        return false;
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          Alert.alert('Error', 'User not found. Please check your credentials.');
          return false;
        } else if (error.response.status === 400) {
          Alert.alert('Error', 'Missing required fields: website, password, and details.');
          return false;
        } else {
          Alert.alert('Error', 'Something went wrong. Please try again.');
          return false;
        }
      } else {
        console.error('Error adding password:', error);
        return false;
      }
     
    } finally {
      setLoading(false);
    }
  };


  const deletePassword =async (PasswordId)=>{
    if(!PasswordId){
      return
    }
    const userid = user;
    try {
      const response = await axios.delete(`http://192.168.0.102:3000/api/passwords/${userid}/${PasswordId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if(response.status === 200){
        Alert.alert('Successfull', 'password deleted successfully');
          fetchPasswords(user)
      } else if(response.status === 404){
        Alert.alert('error', 'password could not deleted');
      }
    } catch (error) {
      Alert.alert('error', error);
    }
  }


  const UpdatePassword = async (website, password, details, id) => {
    if (!website || !password || !details) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    const userid = user;
    try {
      const response = await axios.put(
        `http://192.168.0.102:3000/api/passwords/${userid}/${id}`,
        { website, password, details },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        fetchPasswords(user)
        router.push(`/${user}/(tabs)/`)
      } else {
        Alert.alert('Error', 'Failed to update password.');
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 404) {
          if (data.message.includes('User not found')) {
            Alert.alert('Error', 'User not found.');
          } else if (data.message.includes('Password not found')) {
            Alert.alert('Error', 'Password not found.');
          }
        } else if (status === 500) {
          Alert.alert('Server Error', 'There was an issue with the server. Please try again later.');
        }
      } else if (error.message === 'Network Error') {
        Alert.alert('Network Error', 'Check your internet connection and try again.');
      } else {
        Alert.alert('Error', 'An unexpected error occurred.');
      }
  
      console.log(error);
    }
  };
  

  // useEffect(() => {
  //   if (user) {
  //     fetchPasswords(user);
  //   }
  // }, [user]);

  return (
    <PasswordContext.Provider
      value={{
        passwordData,
        fetchPasswords,
        handleSubmit,
        loading,
        deletePassword,
        UpdatePassword,
      }}
    >
      {children}
    </PasswordContext.Provider>
  );
};
