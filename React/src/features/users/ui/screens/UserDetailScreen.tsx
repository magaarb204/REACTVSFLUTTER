// src/features/users/ui/screens/UserDetailScreen.tsx
// Equivalent to Flutter's UserDetailPage

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'UserDetail'>;

export default function UserDetailScreen({ route }: Props) {
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.field}>Username: {user.username}</Text>
      <View style={styles.spacer} />
      <Text style={styles.field}>Email: {user.email}</Text>
      <View style={styles.spacer} />
      <Text style={styles.field}>Phone: {user.phone}</Text>
      <View style={styles.spacer} />
      <Text style={styles.field}>Website: {user.website}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  field: {
    fontSize: 16,
  },
  spacer: {
    height: 12,
  },
});
