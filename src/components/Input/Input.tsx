import React, { HTMLInputTypeAttribute } from 'react'
import './Input.css'

type Props = {
  placeholder: string
  name: string
  type: HTMLInputTypeAttribute
}

const Input = (props: Props) => {
  return (
    <input
      name={props.name}
      placeholder={props.placeholder}
      required
      type={props.type}
      className="input"
    />
  )
}

export default Input
