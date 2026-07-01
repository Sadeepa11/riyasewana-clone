import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import FormField from './FormField';

export default function PasswordField({ label, required, value, onChange, placeholder, hint, error, name }) {
  const [show, setShow] = useState(false);

  return (
    <FormField label={label} required={required} hint={hint} error={error}>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="form-input pr-10"
        />
        <button
          type="button"
          onClick={() => setShow(s => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          tabIndex={-1}
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </FormField>
  );
}
