import { ChangeEvent } from 'react';
import styles from './bar.module.css';

interface ProgressbarProps {
  max: number;
  value: number;
  step: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  readOnly: boolean;
}

export default function Progressbar({
  max,
  value,
  step,
  onChange,
  readOnly,
}: ProgressbarProps) {
  return (
    <input
      className={styles.styledProgressInput}
      type="range"
      min="0"
      max={max}
      value={value}
      step={step}
      onChange={onChange}
      readOnly={readOnly}
    />
  );
}
