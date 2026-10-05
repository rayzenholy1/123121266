import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { COLORS } from '../constants';
import { Field } from './Field';

interface TextFieldProps extends TextInputProps {
  label: string;
  error?: string;
}

export function TextField({ label, error, style, ...rest }: TextFieldProps) {
  return (
    <Field label={label} error={error}>
      <TextInput
        placeholderTextColor="#9ca3af"
        style={[styles.input, error ? styles.inputError : null, style]}
        {...rest}
      />
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
    paddingVertical: 11,
    fontSize: 16,
    color: COLORS.text,
  },
  inputError: { borderColor: COLORS.error },
});
