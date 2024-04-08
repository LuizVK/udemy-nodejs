import bus from '../../utils/bus'
import { useEffect, useRef, useState } from 'react'

// styles
import styles from './Message.module.css'

export default function Message() {
    const [visibility, setVisibility] = useState(false)
    let [message, setMessage] = useState("")
    let [type, setType] = useState("")
    let timeoutIdRef = useRef(0)

    useEffect(() => {
        bus.addListener('flash', ({ message, type, time }) => {
            setVisibility(true)
            setMessage(message)
            setType(type)

            clearTimeout(timeoutIdRef.current)

            timeoutIdRef.current = setTimeout(() => {
                setVisibility(false)
            }, (time * 1000))
        })

    }, [])

    return (
        visibility && (
            <div className={`${styles.message} ${type ? styles[type] : ''}`}>{message}</div>
        )
    )
}