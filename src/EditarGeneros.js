import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const EditarGenero = (props) => {
    const { match } = props
    const [form, setForm] = useState({ name: '' })
    const [success, setSuccess] = useState(false)

    const onChange = (event) => {
        setForm({ name: event.target.value })
    }

    useEffect(() => {
        axios.get('/api/genres/'+match.params.id).then((res) => {
            setForm(res.data)
        })
    },[match.params.id])//sempre que alterado, executo esse codigo, match.params.id é a dependencia 

    const save = () => {
        axios.put('/api/genres/'+match.params.id, form).then((res) => {
            setSuccess(true)
        })
    }

    if (success) {
        return <Redirect to='/generos' />
    }

    return (
        <div className='container'>
            <h1>Editar genero</h1>

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

export default EditarGenero