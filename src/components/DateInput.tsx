import { Input } from '@/components/ui/input';
import { CalendarIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface DateInputProps {
  value: string;
  onChange: (
    dateString: string,
    dateObject: Date | null,
    isValid: boolean,
  ) => void;
  className?: string;
  placeholder?: string;
}

const DateInput = ({
  value,
  onChange,
  className = '',
  placeholder = 'dd/mm/aaaa',
}: DateInputProps) => {
  const [inputValue, setInputValue] = useState(value);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Função para converter string de data no formato dd/mm/aaaa para objeto Date
  const convertToDateObject = (dateStr: string): Date | null => {
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
      return null;
    }

    const [day, month, year] = dateStr.split('/').map(Number);

    // Mês em JavaScript é baseado em zero (0-11)
    const dateObject = new Date(year, month - 1, day);

    // Verifica se a data resultante é válida
    const isValidDate =
      dateObject.getFullYear() === year &&
      dateObject.getMonth() === month - 1 &&
      dateObject.getDate() === day;

    return isValidDate ? dateObject : null;
  };

  // Função para validar a data
  const validateDate = (dateStr: string): boolean => {
    // Verifica se está no formato correto
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
      return false;
    }

    const [day, month, year] = dateStr.split('/').map(Number);

    // Verifica se mês está entre 1 e 12
    if (month < 1 || month > 12) {
      return false;
    }

    // Verifica se o ano é válido (entre 1900 e 2100 para um exemplo razoável)
    if (year < 1900 || year > 2100) {
      return false;
    }

    // Verifica o número máximo de dias de acordo com o mês
    const maxDays = new Date(year, month, 0).getDate();
    if (day < 1 || day > maxDays) {
      return false;
    }

    return true;
  };

  // Aplica máscara para o formato dd/mm/aaaa automaticamente
  const formatInputValue = (value: string): string => {
    // Remove caracteres não numéricos
    const digits = value.replace(/\D/g, '');

    // Aplica a máscara
    if (digits.length <= 2) {
      return digits;
    } else if (digits.length <= 4) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    } else {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = formatInputValue(rawValue);
    setInputValue(formattedValue);

    // Valida apenas se o campo estiver completo
    const newIsValid =
      formattedValue.length !== 10 || validateDate(formattedValue);
    setIsValid(newIsValid);

    // Converte para objeto Date se for válido e estiver completo
    const dateObject =
      formattedValue.length === 10 && newIsValid
        ? convertToDateObject(formattedValue)
        : null;

    // Notifica o componente pai com o valor, objeto Date e estado de validação
    onChange(formattedValue, dateObject, newIsValid);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          maxLength={10}
          className={`pl-10 ${!isValid ? 'border-red-500 focus:ring-red-500' : ''}`}
        />
        <CalendarIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
      </div>
      {!isValid && inputValue.length === 10 && (
        <p className="mt-1 text-xs text-red-500">
          Data inválida. Use o formato dd/mm/aaaa.
        </p>
      )}
    </div>
  );
};

export default DateInput;
