import React, { useState } from 'react';

interface PriceInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type'> {
  value: number;
  onValueChange: (value: number) => void;
}

const formatPrice = (value: number) => value.toLocaleString('pt-BR', {
  useGrouping: false,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function PriceInput({ value, onValueChange, onFocus, onBlur, ...props }: PriceInputProps) {
  // Keep incomplete input (empty text or a trailing comma) while editing.
  const [draft, setDraft] = useState<{ text: string; value: number } | null>(null);
  const text = draft !== null && draft.value === value ? draft.text : formatPrice(value);

  return (
    <input
      {...props}
      type="text"
      inputMode="decimal"
      value={text}
      onFocus={(event) => {
        if (value === 0) event.currentTarget.select();
        onFocus?.(event);
      }}
      onChange={(event) => {
        const raw = event.target.value.replace('.', ',');
        if (!/^\d*(,\d{0,2})?$/.test(raw)) return;
        const nextText = raw.replace(/^0+(?=\d)/, '');
        const nextValue = Number(nextText.replace(',', '.'));
        const numericValue = nextText === ',' ? 0 : nextValue;
        if (!Number.isFinite(numericValue)) return;
        setDraft({ text: nextText, value: numericValue });
        onValueChange(numericValue);
      }}
      onBlur={(event) => {
        setDraft(null);
        onBlur?.(event);
      }}
    />
  );
}
