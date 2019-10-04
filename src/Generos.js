import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Generos = () => {
    const [data, setData] = useState([])
    //crio um efeito colateral
    useEffect(() => {
        axios.get('/api/genres').then(res => {
            setData(res.data.data)
        })
    }, [])//executa só a primeia vez

    const renderRow = (data) => {
        return (
            <tr key={data.id}>
                <th scope='row'>{data.id}</th>
                <td>{data.name}</td>
                <td><Link to={'/generos/' + data.id} className='btn btn-info'>Editar</Link></td>
                <td><button className='btn btn-danger' onClick={() => deleteGenero(data.id)}>Deletar</button></td>
            </tr>
        )
    }

    const deleteGenero = id => {
        axios.delete('api/genres/' + id).then(() => {
            //filter me retorna um novo array
            const filtrado = data.filter((item) => {
                if (item.id !== id) {
                    return item
                }
            })
            setData(filtrado)
        })
    }

    if (data.length === 0) {
        return (
            <div className='container'>
                <h2>Gêneros</h2>
                <Link className='btn btn-primary spacing-button' to='/generos/novo'>Novo gênero</Link>
                <div class="alert alert-primary" role="alert">
                    Nenhum registro foi encontrado.
                </div>
            </div>
        )
    } else {
        return (
            <div className='container page'>
                <h2>Gêneros</h2>
                <Link className='btn btn-primary spacing-button' to='/generos/novo'>Novo gênero</Link>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Nome</th>
                            <th scope='col'>Editar</th>
                            <th scope='col'>Deletar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((data) => renderRow(data))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Generos