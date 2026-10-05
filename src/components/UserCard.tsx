import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS, GENDER_OPTIONS, GOAL_OPTIONS } from '../constants';
import { UserRecord } from '../types';
import { isoToDisplay } from '../utils/format';

interface UserCardProps {
  user: UserRecord;
  onDelete: (id: number) => void;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

export function UserCard({ user, onDelete }: UserCardProps) {
  const gender = GENDER_OPTIONS.find((o) => o.value === user.gender)?.label ?? '';
  const goal = GOAL_OPTIONS.find((o) => o.value === user.goal)?.label ?? '';

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {user.photo ? (
          <Image source={{ uri: user.photo }} style={styles.photo} />
        ) : (
          <View style={[styles.photo, styles.photoEmpty]} />
        )}
        <View style={styles.headerText}>
          <Text style={styles.name}>
            {user.firstName} {user.lastName}
          </Text>
          <Text style={styles.sub}>{user.city}</Text>
        </View>
        <Pressable onPress={() => onDelete(user.id)}>
          <Text style={styles.delete}>Видалити</Text>
        </Pressable>
      </View>

      <Row label="Дата народження" value={isoToDisplay(user.birthDate)} />
      <Row label="Телефон" value={user.phone} />
      <Row label="Email" value={user.email} />
      <Row label="Стать" value={gender} />
      <Row label="Мета реєстрації" value={goal} />
      <Row label="Згода з правилами" value={user.consent ? 'Так' : 'Ні'} />
      <Row label="Зареєстровано" value={user.createdAt} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  photo: { width: 56, height: 56, borderRadius: 28 },
  photoEmpty: { backgroundColor: COLORS.border },
  headerText: { flex: 1, marginLeft: 12 },
  name: { fontSize: 18, fontWeight: '600', color: COLORS.text },
  sub: { fontSize: 13, color: COLORS.muted, marginTop: 2 },
  delete: { color: COLORS.error, fontWeight: '500' },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  rowLabel: { color: COLORS.muted, fontSize: 14 },
  rowValue: { color: COLORS.text, fontSize: 14, flexShrink: 1, textAlign: 'right', marginLeft: 12 },
});
