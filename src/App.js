import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Header from './Header'
import Generos from './Generos'
import NovoGeneros from './NovoGenero'
//BrowserRouter => para ficar limpinho, como /series e /generos
//Route => Que é minha rota
import { BrowserRouter as Router, Route } from 'react-router-dom'

const Home =()=>{
  return <h1>Home</h1>
}


function App() {
  //temos o projeto minhas-series-server como dependencia
  //e rodamos esse cara dessa forma:  node ./node_modules/minhas-series-server/index.js e ficara disponivel em "http://localhost:3002/"
  //é legal fazer as requisições de uma maneira mais simples, sem precisar colocar porta e tudo mais
  //para isso criamos no package.json criamos proxy, ele funciona só em desenvolvimento, e minhas requisições apontam para "http://localhost:3002/"

  const [data,setData] = useState({})

  //crio um efeito colateral
  useEffect(()=>{
    axios.get('/api').then(res=>{
      setData(res.data)
    })
  })

  return (
    <Router>
      <div className='App'>
        <Header />
        {/*exact => para ser extamente, caso contrario, ele pega que tem barra e acaba exibindo os dois componentes*/}
        <Route path='/' exact component={Home}></Route>
        <Route path='/generos' exact component={Generos}></Route>
        <Route path='/generos/novo' component={NovoGeneros}></Route>
        <pre>{JSON.stringify(data)}</pre>
      </div>
    </Router>
  )
}

export default App;