import { ButtonHTMLAttributes } from 'react';

export const Button = ({
  className: propClassName,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const classes = [
    'bg-blue-900',
    'hover:bg-blue-950', 
    'rounded',
    'px-4',
    'py-2',
    ...(propClassName ? [propClassName] : [])
  ].join(' ')
  return (
    <button {...props} className={classes} />
  )
}