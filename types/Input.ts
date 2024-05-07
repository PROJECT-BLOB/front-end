import { UseFormRegister } from 'react-hook-form';

import { ContentField } from '@/app/signin/_hooks/useCreateUserForm';

import { ValidatorType } from '@utils/registerOptions';

import { Errors } from './Errors';

export interface InputProps {
  required?: boolean;
  labelName: string;
  id: string;
  name: string;
  value?: string;
  getValues?: (name: string) => string;
  watch?: (name: string) => string;
  maxLength?: number;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register?: UseFormRegister<ContentField>;
  errors?: Errors;
  validator?: ValidatorType;
}
