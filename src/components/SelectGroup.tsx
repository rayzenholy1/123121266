import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants';
import { Field } from './Field';

interface Option<T extends string> {
  value: T;
  label: string;
}

interface SelectGroupProps<T extends string> {
  label: string;
  options: Option<T>[];
  value: T | null;
  onChange: (value: T) => void;
  error?: string;
}

export function SelectGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  error,
}: SelectGroupProps<T>) {
  return (
    <Field label={label} error={error}>
      <View style={styles.row}>
        {options.map((option) => {
          const active = option.value === value;
          return (
            <Pressable
              key={option.value}
              onPress={() => onChange(option.value)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </Field>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  chipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  chipText: { color: COLORS.text, fontSize: 14 },
  chipTextActive: { color: '#ffffff', fontWeight: '600' },
});
