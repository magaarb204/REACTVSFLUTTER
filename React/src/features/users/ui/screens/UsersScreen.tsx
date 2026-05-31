// src/features/users/ui/screens/UsersScreen.tsx
// Equivalent to Flutter's UsersPage

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../navigation/types';
import { useUserStore } from '../store/userStore';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Users'>;
};

export default function UsersScreen({ navigation }: Props) {
  const { state, loadUsers, refreshUsers, deleteUser } = useUserStore();
  const buildStopwatch = useRef(Date.now());

  useEffect(() => {
    loadUsers();
  }, []);

  // Mirror Flutter's AppBar actions
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={refreshUsers} style={styles.headerBtn}>
          <Text style={styles.headerBtnText}>↻</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, refreshUsers]);

  if (state.status === 'loading') {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (state.status === 'error') {
    return (
      <View style={styles.center}>
        <Text>{state.error}</Text>
      </View>
    );
  }

  const users = state.users;

  // Performance log — mirrors Flutter's buildStopwatch
  const elapsed = Date.now() - buildStopwatch.current;
  console.log('========================');
  console.log('USERS SCREEN RENDERED');
  console.log(`TIME: ${elapsed} ms`);
  console.log(`USERS COUNT: ${users.length}`);
  console.log('========================');

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => navigation.navigate('UserDetail', { user: item })}
          >
            <View style={styles.listItemContent}>
              <Text style={styles.listItemTitle}>{item.name}</Text>
              <Text style={styles.listItemSubtitle}>{item.email}</Text>
            </View>
            <View style={styles.listItemActions}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('UserForm', { user: item })
                }
                style={styles.iconBtn}
              >
                <Text style={styles.iconText}>✏️</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => deleteUser(item.id)}
                style={styles.iconBtn}
              >
                <Text style={styles.iconText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {/* FAB — mirrors Flutter's FloatingActionButton */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('UserForm', {})}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerBtn: { paddingHorizontal: 12 },
  headerBtnText: { fontSize: 22, color: '#6750A4' },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  listItemContent: { flex: 1 },
  listItemTitle: { fontSize: 16, fontWeight: '500' },
  listItemSubtitle: { fontSize: 14, color: '#666', marginTop: 2 },
  listItemActions: { flexDirection: 'row' },
  iconBtn: { padding: 8 },
  iconText: { fontSize: 18 },
  separator: { height: 1, backgroundColor: '#eee', marginHorizontal: 16 },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6750A4',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabText: { fontSize: 28, color: '#fff', lineHeight: 32 },
});
