// styles
import styles from './Select.module.css'

export default function Select({ text, name, options, handleOnChange, value }) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select name={name} id={name} onChange={handleOnChange} value={value || ''}>
                <option>Selecione uma opção</option>
                {options.map(op => (
                    <option key={op} value={op}>{op}</option>
                ))}
            </select>
        </div>
    )
}