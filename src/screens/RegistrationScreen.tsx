import React, { useCallback } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CheckboxField } from '../components/CheckboxField';
import { DateField } from '../components/DateField';
import { PhotoPicker } from '../components/PhotoPicker';
import { SelectGroup } from '../components/SelectGroup';
import { TextField } from '../components/TextField';
import { COLORS, GENDER_OPTIONS, GOAL_OPTIONS } from '../constants';
import { useRegistrationForm } from '../hooks/useRegistrationForm';
import { RootStackParamList } from '../types';
import { formatPhone } from '../utils/format';

type Props = NativeStackScreenProps<RootStackParamList, 'Registration'>;

export default function RegistrationScreen({ navigation }: Props) {
  const onSaved = useCallback(() => navigation.navigate('Users'), [navigation]);
  const { values, errors, submitting, setField, submit } =
    useRegistrationForm(onSaved);

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.section}>Особисті дані</Text>

        <TextField
          label="Ім’я"
          placeholder="Наприклад: Іван"
          value={values.firstName}
          onChangeText={(t) => setField('firstName', t)}
          error={errors.firstName}
          autoCapitalize="words"
        />
        <TextField
          label="Прізвище"
          placeholder="Наприклад: Іванов"
          value={values.lastName}
          onChangeText={(t) => setField('lastName', t)}
          error={errors.lastName}
          autoCapitalize="words"
        />
        <DateField
          label="Дата народження"
          value={values.birthDate}
          onChange={(d) => setField('birthDate', d)}
          error={errors.birthDate}
        />

        <Text style={styles.section}>Контактна інформація</Text>

        <TextField
          label="Номер телефону"
          placeholder="+380 (___) ___-__-__"
          value={values.phone}
          onChangeText={(t) => setField('phone', formatPhone(t))}
          error={errors.phone}
          keyboardType="phone-pad"
          maxLength={19}
        />
        <TextField
          label="Електронна пошта (Email)"
          placeholder="name@example.com"
          value={values.email}
          onChangeText={(t) => setField('email', t)}
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextField
          label="Місто проживання"
          placeholder="Наприклад: Київ"
          value={values.city}
          onChangeText={(t) => setField('city', t)}
          error={errors.city}
          autoCapitalize="words"
        />

        <Text style={styles.section}>Облікові дані та уподобання</Text>

        <TextField
          label="Пароль"
          placeholder="Мінімум 8 символів"
          value={values.password}
          onChangeText={(t) => setField('password', t)}
          error={errors.password}
          secureTextEntry
          autoCapitalize="none"
        />
        <SelectGroup
          label="Стать"
          options={GENDER_OPTIONS}
          value={values.gender}
          onChange={(v) => setField('gender', v)}
          error={errors.gender}
        />
        <SelectGroup
          label="Основна мета реєстрації"
          options={GOAL_OPTIONS}
          value={values.goal}
          onChange={(v) => setField('goal', v)}
          error={errors.goal}
        />
        <PhotoPicker
          label="Фото"
          value={values.photo}
          onChange={(uri) => setField('photo', uri)}
          error={errors.photo}
        />
        <CheckboxField
          label="Погоджуюсь із правилами сервісу та обробкою даних"
          checked={values.consent}
          onChange={(v) => setField('consent', v)}
          error={errors.consent}
        />

        <Pressable
          onPress={submit}
          disabled={submitting}
          style={[styles.submit, submitting && styles.submitDisabled]}
        >
          {submitting ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.submitText}>Зареєструватися</Text>
          )}
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 16, paddingBottom: 40 },
  section: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 8,
    marginBottom: 12,
  },
  submit: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  submitDisabled: { opacity: 0.6 },
  submitText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
});
