import { useState } from 'react';

type FormErrors<T> = Partial<Record<keyof T, string>>;

export function useForm<T extends Record<string, string>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});

  const handleChange = (field: keyof T, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const setError = (field: keyof T, message: string) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const clearErrors = () => setErrors({});

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  return { values, errors, handleChange, setError, clearErrors, reset };
}
