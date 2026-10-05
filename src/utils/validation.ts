import { FormErrors, FormValues } from '../types';

const NAME_RE = /^[A-Za-zА-Яа-яІіЇїЄєҐґ'’\-\s]{2,}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+380 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

export function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!NAME_RE.test(values.firstName.trim())) {
    errors.firstName = 'Введіть коректне ім’я';
  }
  if (!NAME_RE.test(values.lastName.trim())) {
    errors.lastName = 'Введіть коректне прізвище';
  }
  if (!values.birthDate) {
    errors.birthDate = 'Оберіть дату народження';
  }
  if (!PHONE_RE.test(values.phone)) {
    errors.phone = 'Введіть номер у форматі +380 (XXX) XXX-XX-XX';
  }
  if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = 'Введіть коректний email';
  }
  if (values.city.trim().length < 2) {
    errors.city = 'Вкажіть місто проживання';
  }
  if (
    values.password.length < 8 ||
    !/[A-Za-zА-Яа-я]/.test(values.password) ||
    !/\d/.test(values.password)
  ) {
    errors.password = 'Мінімум 8 символів, літери та цифри';
  }
  if (!values.gender) {
    errors.gender = 'Оберіть стать';
  }
  if (!values.goal) {
    errors.goal = 'Оберіть мету реєстрації';
  }
  if (!values.consent) {
    errors.consent = 'Необхідна згода з правилами сервісу';
  }
  if (!values.photo) {
    errors.photo = 'Додайте фото';
  }

  return errors;
}
