import { ChangeEvent } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

import { ValidatorType } from '@utils/registerOptions';

import { Errors } from './Errors';

export interface InputProps<T extends FieldValues> {
  required?: boolean;
  labelName: string;
  id: string;
  name: string;
  value?: string;
  watch?: (name: string) => string;
  maxLength?: number;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register?: UseFormRegister<T>;
  errors?: Errors;
  validator?: ValidatorType;
  rows?: number;
}

export interface TextAreaProps {
  labelName: string;
  id: string;
  name: string;
  watch?: (name: string) => string;
  maxLength?: number;
  placeholder: string;
  register?: UseFormRegister<FieldValues>;
  rows: number;
}
