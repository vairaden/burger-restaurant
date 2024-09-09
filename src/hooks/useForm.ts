import { ChangeEvent, useState } from 'react';

export function useForm<T extends Record<string, unknown>>(
  initialValues: T | (() => T)
) {
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  return { formValues, handleChange, setFormValues };
}
