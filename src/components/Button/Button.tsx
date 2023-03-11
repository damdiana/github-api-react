import React, { PropsWithChildren } from 'react'
import './Button.css'

type Props = {
  variant: 'full' | 'outline'
}

const Button = ({ variant, children }: PropsWithChildren<Props>) => {
  return (
    <button
      type="button"
      className={`btn ${variant === 'full' ? 'btn-full' : 'btn-outline'}`}
    >
      {children}
    </button>
  )
}

export default Button
