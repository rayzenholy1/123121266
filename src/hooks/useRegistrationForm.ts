import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { insertUser } from '../db/database';
import { FormErrors, FormValues } from '../types';
import { toIsoDate } from '../utils/format';
import { hashPassword } from '../utils/security';
import { validate } from '../utils/validation';

const INITIAL_VALUES: FormValues = {
  firstName: '',
  lastName: '',
  birthDate: null,
  phone: '',
  email: '',
  city: '',
  password: '',
  gender: null,
  goal: null,
  consent: false,
  photo: null,
};

export function useRegistrationForm(onSaved: () => void) {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const setField = useCallback(
    <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
      setValues((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    },
    []
  );

  const submit = useCallback(async () => {
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    try {
      const passwordHash = await hashPassword(values.password);
      await insertUser({
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        birthDate: toIsoDate(values.birthDate as Date),
        phone: values.phone,
        email: values.email.trim().toLowerCase(),
        city: values.city.trim(),
        passwordHash,
        gender: values.gender as NonNullable<FormValues['gender']>,
        goal: values.goal as NonNullable<FormValues['goal']>,
        consent: values.consent ? 1 : 0,
        photo: values.photo,
      });
      setValues(INITIAL_VALUES);
      onSaved();
    } catch (e) {
      if (String(e).includes('UNIQUE')) {
        setErrors({ email: 'Цей email вже зареєстровано' });
      } else {
        Alert.alert('Помилка', 'Не вдалося зберегти дані');
      }
    } finally {
      setSubmitting(false);
    }
  }, [values, onSaved]);

  return { values, errors, submitting, setField, submit };
}
