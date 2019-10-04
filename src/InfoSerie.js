import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Badge } from 'reactstrap'

const InfoSerie = (props) => {
    const { match } = props
    const [form, setForm] = useState({})
    const [success, setSuccess] = useState(false)
    const [genres, setGenres] = useState([])
    const [data, setData] = useState({})

    useEffect(() => {
        axios.get('/api/series/' + match.params.id).then(res => {
            setData(res.data)
            setForm(res.data)
        })
    }, [match.params.id])

    useEffect(() => {
        axios.get('/api/genres').then(res => {
            setGenres(res.data.data)
        })
    }, [])

    const customHeader = {
        height: '50vh',
        minHeight: '500px',
        backgroundImage: `url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }

    const onChange = (field) => (event) => {
        console.log([field], event.target.value)
        setForm({
            ...form,
            [field]: event.target.value //[field] key dinamico, pegar tanto name e comments
        })
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
        axios.put('/api/series/' + match.params.id, form).then((res) => {
            setSuccess(true)
        })
    }

    if (success) {
        return <Redirect to='/series' />
    }

    return (
        <div>
            <header style={customHeader}>
                <div className='h-100' style={{ background: 'rgba(0,0,0,0.7)' }}>
                    <div className='h-100 container'>
                        <div className='row h-100 align-items-center'>
                            <div className='col-3'>
                                <img alt={data.name} className='img-fluid img-thumbnail' src={data.poster} />
                            </div>
                            <div className='col-9'>
                                <h1 className='font-weight-light text-white'>{data.name}</h1>
                                <div className='lead text-white'>
                                    {
                                        data.status === "ASSISTIDO" &&
                                        <Badge color='success'>Assistido</Badge>
                                    }
                                    {
                                        data.status === "PARA_ASSISTIR" &&
                                        <Badge color='warning'>Para assistir</Badge>
                                    }
                                    <div>
                                        Genêro: {data.genre}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className='container page'>
                <h2>Editar série</h2>
                <form>
                    <div className='form-group'>
                        <label for='name'>Nome</label>
                        <input type='text' value={form.name} onChange={onChange('name')} className='form-control' id='name' placeholder='Nome' />
                    </div>
                    <div className='form-group'>
                        <label for='name'>Gêneros</label>
                        <select className='form-control' id='genre' onChange={onChangeGenre} defaultValue={form.genre_id}>
                            {genres.map((item) => {
                                return <option key={item.id} value={item.id} selected={item.id === form.genre_id}>{item.name}</option>
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
        </div>
    )
}

export default InfoSerie