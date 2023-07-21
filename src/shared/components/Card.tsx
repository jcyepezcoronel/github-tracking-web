import { HTMLAttributes } from 'react';

export const Card = ({
  className: propClassName,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const classes = [
    'card',
    'rounded',
    'bg-gray-800',
    'px-5',
    'py-4',
    ...(propClassName ? [propClassName] : [])
  ].join(' ')
  return (
    <div {...props} className={classes} />
  ) 
}