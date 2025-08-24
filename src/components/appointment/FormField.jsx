import React from 'react';

export function FormField({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onInput,
  required = false,
  options = [],
  rows,
  min,
  id,
  checked,
  className = ''
}) {
  const baseInputClasses = "w-full px-4 py-3 border border-[#E3F2FD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1976D2] focus:border-transparent";

  if (type === 'select') {
    return (
      <div className={className}>
        <label className="block text-sm font-medium text-[#333] mb-2">
          {label} {required && '*'}
        </label>
        <select
          className={baseInputClasses}
          value={value}
          onChange={onChange}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (type === 'textarea') {
    return (
      <div className={className}>
        <label className="block text-sm font-medium text-[#333] mb-2">
          {label} {required && '*'}
        </label>
        <textarea
          className={baseInputClasses}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onInput={onInput}
        />
      </div>
    );
  }

  if (type === 'checkbox') {
    return (
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id={id}
          className="mt-1"
          checked={checked}
          onChange={onChange}
        />
        <label htmlFor={id} className="text-sm text-[#333]">
          {label}
        </label>
      </div>
    );
  }

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-[#333] mb-2">
        {label} {required && '*'}
      </label>
      <input
        type={type}
        className={baseInputClasses}
        placeholder={placeholder}
        value={value}
        onInput={onInput}
        min={min}
      />
    </div>
  );
}
