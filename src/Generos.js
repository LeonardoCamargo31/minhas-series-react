import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

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
                <td><button>+</button></td>
            </tr>
        )
    }

    if (data.length === 0) {
        return (
            <div className='container'>
                <h1>Generos</h1>
                <Link to='/generos/novo'>Novo genero</Link>
                <div class="alert alert-primary" role="alert">
                    Nenhum registro foi encontrado.
                </div>
            </div>
        )
    } else {
        return (
            <div className='container'>
                <h1>Generos</h1>
                <Link to='/generos/novo'>Novo genero</Link>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>First</th>
                            <th scope='col'>Last</th>
                            <th scope='col'>Handle</th>
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