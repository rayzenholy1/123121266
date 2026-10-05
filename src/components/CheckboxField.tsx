import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants';

interface CheckboxFieldProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
}

export function CheckboxField({ label, checked, onChange, error }: CheckboxFieldProps) {
  return (
    <View style={styles.wrap}>
      <Pressable style={styles.row} onPress={() => onChange(!checked)}>
        <View style={[styles.box, checked && styles.boxChecked]}>
          {checked ? <Text style={styles.mark}>✓</Text> : null}
        </View>
        <Text style={styles.label}>{label}</Text>
      </Pressable>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 14 },
  row: { flexDirection: 'row', alignItems: 'center' },
  box: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  boxChecked: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  mark: { color: '#ffffff', fontSize: 15, fontWeight: '700' },
  label: { flex: 1, fontSize: 14, color: COLORS.text },
  error: { fontSize: 12, color: COLORS.error, marginTop: 4 },
});
