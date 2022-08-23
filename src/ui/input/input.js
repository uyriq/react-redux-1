import React from 'react'
import styles from './input.module.css'

export function Input({ type, placeholder, inputWithBtn, extraClass, inputRef }) {
    const className = `${styles.input} ${extraClass} ${inputWithBtn ? styles.input_withBtn : ''}`
    return <input type={type} className={className} placeholder={placeholder} ref={inputRef} />
}
