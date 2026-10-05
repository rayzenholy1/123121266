import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { UserCard } from '../components/UserCard';
import { COLORS } from '../constants';
import { deleteUser, getUsers } from '../db/database';
import { UserRecord } from '../types';

export default function UsersScreen() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      setUsers(await getUsers());
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const remove = useCallback(
    (id: number) => {
      Alert.alert('Видалити запис?', undefined, [
        { text: 'Скасувати', style: 'cancel' },
        {
          text: 'Видалити',
          style: 'destructive',
          onPress: async () => {
            await deleteUser(id);
            load();
          },
        },
      ]);
    },
    [load]
  );

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" />;
  }

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      data={users}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => <UserCard user={item} onDelete={remove} />}
      ListEmptyComponent={<Text style={styles.empty}>Записів ще немає</Text>}
    />
  );
}

const styles = StyleSheet.create({
  loader: { flex: 1, backgroundColor: COLORS.background },
  list: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 16 },
  empty: { textAlign: 'center', color: COLORS.muted, marginTop: 40 },
});
