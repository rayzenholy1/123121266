import React from 'react';
import { Alert, Image, Pressable, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { COLORS } from '../constants';
import { Field } from './Field';

interface PhotoPickerProps {
  label: string;
  value: string | null;
  onChange: (uri: string) => void;
  error?: string;
}

export function PhotoPicker({ label, value, onChange, error }: PhotoPickerProps) {
  const pick = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Немає доступу', 'Надайте доступ до галереї в налаштуваннях');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.4,
      base64: true,
    });

    if (!result.canceled && result.assets[0]?.base64) {
      onChange(`data:image/jpeg;base64,${result.assets[0].base64}`);
    }
  };

  return (
    <Field label={label} error={error}>
      <Pressable onPress={pick} style={[styles.box, error ? styles.boxError : null]}>
        {value ? (
          <Image source={{ uri: value }} style={styles.image} />
        ) : (
          <Text style={styles.placeholder}>Обрати фото</Text>
        )}
      </Pressable>
    </Field>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  boxError: { borderColor: COLORS.error },
  image: { width: '100%', height: '100%' },
  placeholder: { color: COLORS.muted, fontSize: 14, textAlign: 'center' },
});
