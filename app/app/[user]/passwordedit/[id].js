import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import CustomButton from '../../../components/Customebtn';
import { useGlobalSearchParams, useNavigation } from 'expo-router';
import { PasswordContext } from '../../../context/apicontext';

const Id = () => {
  const { website, description, password,id } = useGlobalSearchParams();
  const [Website, setWebsite] = useState(website);
  const [Password, setPassword] = useState(password);
  const [Description, setDescription] = useState(description);

  const {UpdatePassword} = useContext(PasswordContext)

  const navigation = useNavigation(); 

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#6a5acd',
      },
      headerTintColor: '#fff', 
      headerTitle: 'Edit Password',
    });
  }, [navigation]);
  

  const HandleSubmit = async() => {
    if (!Website || !Password || !Description) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    await UpdatePassword(Website, Password, Description,id);
    
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Update Password</Text>

        <TextInput
          style={styles.input}
          placeholder="Website"
          value={Website}
          onChangeText={setWebsite}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={Password}
          onChangeText={setPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Description"
          value={Description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        <View style={styles.buttonContainer}>
          <CustomButton
            title="Edit"
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
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

export default Id;
