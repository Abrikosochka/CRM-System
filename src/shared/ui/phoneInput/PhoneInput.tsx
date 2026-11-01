import React, { type ChangeEvent } from 'react';
import { Input } from 'antd';

interface Props {
  value?: string;
  onChange?: (value: string) => void;
}

export const PhoneInput: React.FC<Props> = ({
  value = '',
  onChange,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const digits = event.target.value.replace(/\D/g, '');

    let formatted = '';
    if (digits) {
      formatted = '+7';
      if (digits.length > 1) formatted += ` (${digits.slice(1, 4)}`;
      if (digits.length >= 5) formatted += `) ${digits.slice(4, 7)}`;
      if (digits.length >= 8) formatted += `-${digits.slice(7, 9)}`;
      if (digits.length >= 10) formatted += `-${digits.slice(9, 11)}`;
    }

    onChange?.(formatted);
  };

  return (
    <Input
      value={value}
      placeholder="+7 (___) ___-__-__"
      onChange={handleChange}
    />
  );
};
