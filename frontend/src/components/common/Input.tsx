import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, helperText, id, className = '', ...props },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-help` : undefined}
        className={[
          'w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-gray-900',
          'outline-none transition placeholder:text-gray-400 focus:ring-2',
          error
            ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
            : 'border-gray-300 focus:border-green-600 focus:ring-green-100',
          'disabled:cursor-not-allowed disabled:bg-gray-100',
          className,
        ].join(' ')}
        {...props}
      />
      {error && <p id={`${inputId}-error`} className="text-sm text-red-600">{error}</p>}
      {!error && helperText && (
        <p id={`${inputId}-help`} className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

export default Input;
