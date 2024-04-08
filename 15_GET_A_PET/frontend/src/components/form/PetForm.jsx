import { useState } from "react"

// styles
import formStyles from './Form.module.css'

// components
import Input from './Input'
import Select from "./Select"

export default function PetForm({ handleSubmit, petData, btnText }) {
    const [pet, setPet] = useState(petData || {})
    const [preview, setPreview] = useState([])
    const colors = ["Branco", "Preto", "Cinza", "Caramelo", "Mesclado"]

    function onFileChange(e) {
        const imgs = [...e.target.files]
        setPreview(imgs)
        setPet({ ...pet, [e.target.name]: imgs })
    }

    function handleOnChange(e) {
        setPet({ ...pet, [e.target.name]: e.target.value })
    }

    function handleColor(e) {
        setPet({ ...pet, [e.target.name]: e.target.options[e.target.selectedIndex].text })
    }

    function submit(e) {
        e.preventDefault()
        handleSubmit(pet)
    }

    return (
        <form onSubmit={submit} className={formStyles.form_container}>
            <div className={formStyles.preview_pet_images}>
                {preview.length > 0
                    ? preview.map((image, index) => (
                        <img 
                            src={URL.createObjectURL(image)} 
                            alt={pet.name} 
                            key={`${pet.name}-${index}`} 
                        />
                    ))
                    : pet.images && pet.images.map((image, index) => (
                        <img 
                            src={`${process.env.REACT_APP_API}/images/pets/${image}`}
                            alt={pet.name}
                            key={`${pet.name}-${index}`}
                        />
                    ))
                }
            </div>
            <Input
                text="Imagens do Pet"
                type="file"
                name="images"
                handleOnChange={onFileChange}
                multiple
            />
            <Input
                text="Nome do Pet"
                type="text"
                name="name"
                placeholder="Digite o nome"
                handleOnChange={handleOnChange}
                value={pet.name || ''}
            />
            <Input
                text="Idade do Pet"
                type="text"
                name="age"
                placeholder="Digite a idade"
                handleOnChange={handleOnChange}
                value={pet.age || ''}
            />
            <Input
                text="Peso do Pet"
                type="number"
                name="weight"
                placeholder="Digite o peso"
                handleOnChange={handleOnChange}
                value={pet.weight || ''}
            />
            <Select
                name="color"
                text="Selecion a cor"
                options={colors}
                handleOnChange={handleColor}
                value={pet.color || ''}
            />
            <input type="submit" value={btnText} />
        </form>
    )
}