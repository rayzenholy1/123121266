export type Gender = 'male' | 'female' | 'other';
export type Goal = 'work' | 'study' | 'communication' | 'business';

export interface FormValues {
  firstName: string;
  lastName: string;
  birthDate: Date | null;
  phone: string;
  email: string;
  city: string;
  password: string;
  gender: Gender | null;
  goal: Goal | null;
  consent: boolean;
  photo: string | null;
}

export type FormErrors = Partial<Record<keyof FormValues, string>>;

export interface NewUser {
  firstName: string;
  lastName: string;
  birthDate: string;
  phone: string;
  email: string;
  city: string;
  passwordHash: string;
  gender: Gender;
  goal: Goal;
  consent: number;
  photo: string | null;
}

export interface UserRecord extends NewUser {
  id: number;
  createdAt: string;
}

export type RootStackParamList = {
  Registration: undefined;
  Users: undefined;
};
