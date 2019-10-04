import React, { useState } from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

const NovoGenero = () => {
    const [form, setForm] = useState({ name: '' })
    const [success, setSuccess] = useState(false)

    const onChange = (event) => {
        setForm({ name: event.target.value })
    }

    const save = () => {
        axios.post('/api/genres', form).then((res) => {
            setSuccess(true)
        })
    }

    if(success){
        return <Redirect to='/generos'/>
    }

    return (
        <div className='container page'>
            <h2>Novo gênero</h2>
            <form>
                <div className='form-group'>
                    <label for='name'>Nome</label>
                    <input type='text' value={form.name} onChange={onChange} className='form-control' id='name' placeholder='Nome' />
                </div>
                <button type='button' onClick={save} className='btn btn-primary'>Enviar</button>
            </form>
        </div>
    )
}

export default NovoGenero