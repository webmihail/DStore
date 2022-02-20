export interface SelectFieldProps {
  title?: string;
  className?: string;
  showValue?: boolean;
  options: Array<{
    value: string | number;
    name: string;
    title?: string;
  }> | null;
  errorMessage?: string | boolean;
  required?: boolean;
}
