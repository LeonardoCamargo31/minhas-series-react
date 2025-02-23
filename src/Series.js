import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Badge } from 'reactstrap'

const Series = () => {
    const [data, setData] = useState([])
    //crio um efeito colateral
    useEffect(() => {
        axios.get('/api/series').then(res => {
            setData(res.data.data)
        })
    }, [])//executa só a primeia vez

    const renderRow = (data) => {
        return (
            <tr key={data.id}>
                <th scope='row'>{data.id}</th>
                <td>{data.name}</td>
                <td>{data.genre}</td>
                <td>{data.status==='ASSISTIDO'? <Badge color='success'>Assistido</Badge>: <Badge color='warning'>Para assistir</Badge>}</td>
                <td><Link to={'/series/' + data.id} className='btn btn-info'>Editar</Link></td>
                <td><button className='btn btn-danger' onClick={() => deleteSerie(data.id)}>Deletar</button></td>
            </tr>
        )
    }

    const deleteSerie = id => {
        axios.delete('api/series/' + id).then(() => {
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
            <div className='container page'>
                <h2>Séries</h2>
                <Link className='btn btn-primary spacing-button' to='/series/novo'>Nova série</Link>
                <div class="alert alert-primary" role="alert">
                    Nenhum registro foi encontrado.
                </div>
            </div>
        )
    } else {
        return (
            <div className='container page'>
                <h2>Séries</h2>
                <Link className='btn btn-primary spacing-button' to='/series/novo'>Nova série</Link>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Nome</th>
                            <th scope='col'>Gênero</th>
                            <th scope='col'>Status</th>
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

export default Series