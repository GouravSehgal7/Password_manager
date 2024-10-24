import { View, Text, TextInput, FlatList, TouchableOpacity, Alert, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import React, { useEffect, useContext, useState, useMemo, useCallback } from 'react';
import * as Clipboard from 'expo-clipboard';
import { PasswordContext } from '../../../context/apicontext';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';

const PasswordItem = React.memo(({ item, onEdit, onDelete, onCopy }) => {

  const renderLeftActions = () => (
    <TouchableOpacity onPress={onEdit} style={styles.leftAction}>
      <Text style={styles.actionText}>Edit</Text>
    </TouchableOpacity>
  );

  const renderRightActions = () => (
    <TouchableOpacity onPress={onDelete} style={styles.rightAction}>
      <Text style={styles.actionText}>Delete</Text>
    </TouchableOpacity>
  );

  return (
    <Swipeable renderLeftActions={renderLeftActions} renderRightActions={renderRightActions}>
      <TouchableOpacity onPress={onCopy} activeOpacity={0.7}>
        <View style={styles.itemContainer}>
          <View style={styles.itemRow}>
            <Ionicons name="globe-outline" size={20} color="#6a5acd" style={styles.icon} />
            <Text style={styles.itemText}>{item?.website}</Text>
          </View>
          <View style={styles.itemRow}>
            <Ionicons name="lock-closed-outline" size={20} color="#6a5acd" style={styles.icon} />
            <Text style={styles.itemText}>{item?.password}</Text>
          </View>
          <View style={styles.itemRow}>
            <Ionicons name="information-circle-outline" size={20} color="#6a5acd" style={styles.icon} />
            <Text style={styles.itemText}>{item?.details}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
});

const ViewPassword = () => {
  const { user } = useGlobalSearchParams();
  const router = useRouter();
  const { passwordData, fetchPasswords, loading, deletePassword } = useContext(PasswordContext);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchPasswords(user);
  }, [user]);

  const filteredPasswords = useMemo(() => {
    if (!passwordData || passwordData.length === 0) return [];
    return passwordData.filter(item => {
      const websiteLower = item.website.toLowerCase();
      const searchTextLower = searchText.toLowerCase();
      return websiteLower.includes(searchTextLower);
    });
  }, [passwordData, searchText]);

  const handleItemPress = useCallback((item) => {
    Clipboard.setString(item.password);
    Alert.alert('Copied to clipboard!', item.password);
  }, []);

  const handleEditPress = useCallback((item) => {
    router.push({ pathname: `${user}/passwordedit/${item.passwordId}`, params: { website: item.website, description: item.details, password: item.password } });
  }, [router, user]);

  const handleDeletePress = useCallback(async (item) => {
    await deletePassword(item.passwordId);
  }, [deletePassword]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#6a5acd" />
      ) : (
        <>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by website..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText} 
          />
          {filteredPasswords.length === 0 ? (
            <Text style={styles.noPasswordsText}>No passwords found for this user</Text>
          ) : (
            <FlatList
              data={filteredPasswords}
              keyExtractor={(item) => item.passwordId}
              renderItem={({ item }) => (
                <PasswordItem
                  item={item}
                  onEdit={() => handleEditPress(item)}
                  onDelete={() => handleDeletePress(item)}
                  onCopy={() => handleItemPress(item)}
                />
              )}
              contentContainerStyle={styles.listContainer}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.25)', 
      },
      android: {
        elevation: 5,
      },
    }),
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  noPasswordsText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
  },
  leftAction: {
    backgroundColor: '#4CAF50',
    // backgroundColor: '#fff',
    // borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.25)',
      },
      android: {
        elevation: 5, 
      },
    }),
  },
  rightAction: {
    backgroundColor: '#FF3B30',
    // backgroundColor: '#fff',
    // borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.25)', 
      },
      android: {
        elevation: 5,
      },
    }),
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    padding: 10,
  },
});

export default ViewPassword;
