import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS } from '../constants';
import { formatDate } from '../utils/format';
import { Field } from './Field';

interface DateFieldProps {
  label: string;
  value: Date | null;
  onChange: (date: Date) => void;
  error?: string;
}

export function DateField({ label, value, onChange, error }: DateFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <Field label={label} error={error}>
      <Pressable
        onPress={() => setVisible(true)}
        style={[styles.input, error ? styles.inputError : null]}
      >
        <Text style={value ? styles.value : styles.placeholder}>
          {value ? formatDate(value) : 'DD.MM.YYYY'}
        </Text>
      </Pressable>

      {visible ? (
        <>
          <DateTimePicker
            value={value ?? new Date(2000, 0, 1)}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            maximumDate={new Date()}
            minimumDate={new Date(1900, 0, 1)}
            onChange={(event, date) => {
              if (Platform.OS === 'android') setVisible(false);
              if (event.type === 'set' && date) onChange(date);
            }}
          />
          {Platform.OS === 'ios' ? (
            <Pressable onPress={() => setVisible(false)} style={styles.done}>
              <Text style={styles.doneText}>Готово</Text>
            </Pressable>
          ) : null}
        </>
      ) : null}
    </Field>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  inputError: { borderColor: COLORS.error },
  value: { fontSize: 16, color: COLORS.text },
  placeholder: { fontSize: 16, color: '#9ca3af' },
  done: { alignSelf: 'flex-end', paddingVertical: 6 },
  doneText: { color: COLORS.primary, fontWeight: '600', fontSize: 16 },
});
