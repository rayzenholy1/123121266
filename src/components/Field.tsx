import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants';

interface FieldProps {
  label: string;
  error?: string;
  children: ReactNode;
}

export function Field({ label, error, children }: FieldProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      {children}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 14 },
  label: { fontSize: 14, fontWeight: '500', color: COLORS.text, marginBottom: 6 },
  error: { fontSize: 12, color: COLORS.error, marginTop: 4 },
});
