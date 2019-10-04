import React, { useState , useEffect} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const NovaSerie = () => {
    const [form, setForm] = useState({ name: '' ,genre_id:'',status:''})
    const [success, setSuccess] = useState(false)
    const [genres, setGenres] = useState([])

    const onChange = (event) => {
        setForm({ name: event.target.value })
    }

    const onChangeGenre = (event) => {
        setForm({
            ...form,
            genre_id: event.target.value //[field] key dinamico, pegar tanto name e comments
        })
    }
    const onCheck = (value) => () => {
        setForm({
            ...form,
            status: value
        })
    }

    const save = () => {
        axios.post('/api/series', form).then((res) => {
            setSuccess(true)
        })
    }

    useEffect(() => {
        axios.get('/api/genres').then(res => {
            setGenres(res.data.data)
        })
    }, [])


    if (success) {
        return <Redirect to='/series' />
    }

    return (
        <div className='container page'>
            <h2>Nova série</h2>
            <form>
                <div className='form-group'>
                    <label for='name'>Nome</label>
                    <input type='text' value={form.name} onChange={onChange} className='form-control' id='name' placeholder='Nome' />
                </div>
                <div className='form-group'>
                    <label for='name'>Gêneros</label>
                    <select className='form-control' id='genre' onChange={onChangeGenre} defaultValue={form.genre_id}>
                        {genres.map((item) => {
                            return <option key={item.id} value={item.id}>{item.name}</option>
                        })}
                    </select>
                </div>
                <div className='form-group'>
                    <label for='name'>Status</label>
                    <div className='form-check'>
                        <input className='form-check-input' checked={form.status === 'ASSISTIDO'} type='radio' name='status' id='assistido' value='ASSISTIDO' onChange={onCheck('ASSISTIDO')} />
                        <label className='form-check-label' for='assistido'>
                            Assistido
                        </label>
                    </div>
                    <div className='form-check'>
                        <input className='form-check-input' checked={form.status === 'PARA_ASSISTIR'} type='radio' name='status' id='paraAssistir' value='PARA_ASSISTIR' onChange={onCheck('PARA_ASSISTIR')} />
                        <label className='form-check-label' for='paraAssistir'>
                            Para assistir
                        </label>
                    </div>
                </div>
                <button type='button' onClick={save} className='btn btn-primary'>Enviar</button>
            </form>
        </div>
    )
}

export default NovaSerie