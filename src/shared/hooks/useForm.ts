import { useForm as useReactHookForm, UseFormProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export function useForm<T extends z.ZodType>(
  schema: T,
  options?: Omit<UseFormProps<z.infer<T>>, 'resolver'>
) {
  return useReactHookForm<z.infer<T>>({
    resolver: zodResolver(schema),
    ...options,
  });
}
