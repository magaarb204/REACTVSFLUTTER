// src/features/users/ui/screens/UserFormScreen.tsx
// Equivalent to Flutter's UserFormPage

import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../navigation/types';
import { useUserStore } from '../store/userStore';
import { User } from '../../domain/entities/User';

type Props = NativeStackScreenProps<RootStackParamList, 'UserForm'>;

export default function UserFormScreen({ route, navigation }: Props) {
  const existingUser = route.params?.user;
  const isEditing = existingUser != null;

  const [name, setName] = useState(existingUser?.name ?? '');
  const [username, setUsername] = useState(existingUser?.username ?? '');
  const [email, setEmail] = useState(existingUser?.email ?? '');
  const [phone, setPhone] = useState(existingUser?.phone ?? '');
  const [website, setWebsite] = useState(existingUser?.website ?? '');

  const { addUser, updateUser } = useUserStore();

  const handleSubmit = () => {
    const user: User = {
      id: existingUser?.id ?? Date.now(),
      name,
      username,
      email,
      phone,
      website,
    };

    if (isEditing) {
      updateUser(user);
    } else {
      addUser(user);
    }

    navigation.pop();
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Website"
          value={website}
          onChangeText={setWebsite}
          autoCapitalize="none"
        />

        <View style={styles.spacer} />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>{isEditing ? 'Actualizar' : 'Crear'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: '#fafafa',
  },
  spacer: { height: 12 },
  button: {
    backgroundColor: '#6750A4',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
