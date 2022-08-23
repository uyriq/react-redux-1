import React from 'react'
import styles from './modal-overlay.module.css'

export function ModalOverlay({ extraClass }) {
    return <div className={`${styles.overlay} ${extraClass}`} />
}
