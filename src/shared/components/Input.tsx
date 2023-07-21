import { InputHTMLAttributes } from 'react';

export const Input = ({
  className: propClassName,
  error,
  helperText,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { error?: boolean; helperText?: string; }) => {
  const classes = [
    'border',
    'text-sm',
    'rounded',
    'block', 
    'w-full', 
    'p-2.5',  
    'bg-gray-700', 
    'placeholder-gray-400',
    'text-white',
    ...(error 
      ? ['border-red-800']
      : [
        'border-gray-600',
        'focus:ring-blue-500', 
        'focus:border-blue-500',
      ]
    ),
    ...(propClassName ? [propClassName] : [])
  ].join(' ')
  return (
    <>
      <input
        {...props}
        className={classes}
      />
      {helperText 
        ?  <span className={
          `${error ? 'text-red-800' : 'text-gray-400'} text-xs`
        }>{helperText}</span>
        : null}
    </>
  )
}