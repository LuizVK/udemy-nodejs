import api from '../../../utils/api'

import { useEffect, useState } from 'react'

import styles from './Profile.module.css'
import fomrStyles from '../../form/Form.module.css'

import Input from '../../form/Input'
import RoundedImage from '../../layout/RoundedImage'

import useFlashMessage from '../../../hooks/useFlashMessage'

export default function Profile() {
    const [user, setUser] = useState({})
    const [preview, setPreview] = useState('')
    const [token] = useState(localStorage.getItem("token") || '')
    const { setFlashMessage } = useFlashMessage()
    
    useEffect(() => {
        api.get('/users/checkuser', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setUser(response.data)
        })
    }, [token])

    function onFileChange(e) {
        setPreview(e.target.files[0])
        setUser({ ...user, [e.target.name]: e.target.files[0] })
    }

    function handleOnChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        let msgType = 'success'

        const formData = new FormData()

        await Object.keys(user).forEach(key => 
            formData.append(key, user[key])
        )

        const data = await api.patch(`/users/edit/${user._id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            msgType = "error"
            return err.response.data
        })

        setFlashMessage(data.message, msgType)
    }

    return (
        <section>
            <div className={styles.profile_header}>
                <h1>Perfil</h1>
                {(user.image || preview) && (
                    <RoundedImage src={preview ? URL.createObjectURL(preview) : `${process.env.REACT_APP_API}/images/users/${user.image}`} alt={user.name} />
                )}
            </div>
            <form onSubmit={handleSubmit} className={fomrStyles.form_container}>
                <Input 
                    text="Imagem"
                    type="file"
                    name="image"
                    handleOnChange={onFileChange}
                />
                <Input 
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite o seu e-mail"
                    handleOnChange={handleOnChange}
                    value={user.email || ''}
                />
                <Input 
                    text="Nome"
                    type="name"
                    name="name"
                    placeholder="Digite o seu nome"
                    handleOnChange={handleOnChange}
                    value={user.name || ''}
                />
                <Input 
                    text="Telefone"
                    type="phone"
                    name="phone"
                    placeholder="Digite o seu telefone"
                    handleOnChange={handleOnChange}
                    value={user.phone || ''}
                />
                <Input 
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite a sua senha"
                    handleOnChange={handleOnChange}
                />
                <Input 
                    text="Confirmação de senha"
                    type="password"
                    name="confirmpassword"
                    placeholder="Confirme a sua senha"
                    handleOnChange={handleOnChange}
                />
                <input type="submit" value="Editar" />
            </form>
        </section>
    )
}