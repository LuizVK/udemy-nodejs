// styles
import styles from './Input.module.css'

export default function Input(props) {
    const { type, text, name, placeholder, handleOnChange, value, multiple } = props
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <input 
                type={type} 
                name={name} 
                id={name} 
                placeholder={placeholder} 
                onChange={handleOnChange}
                value={value}
                {...(multiple ? { multiple } : '')}
            />
        </div>
    )
}