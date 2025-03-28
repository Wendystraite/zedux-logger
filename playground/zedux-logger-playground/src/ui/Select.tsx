interface SelectProps<T extends string | number> {
  value: T;
  onChange: (value: T) => void;
  options: {
    value: T;
    label: string;
  }[];
  placeholder?: string;
  className?: string;
}

export function Select<T extends string | number>({
  value,
  onChange,
  options,
  placeholder,
  className = '',
}: SelectProps<T>) {
  return (
    <select
      value={value}
      multiple={false}
      onChange={(e) => {
        onChange(e.target.value as T);
      }}
      className={`block px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${className}`}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
