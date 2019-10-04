import React from 'react';
import Header from './Header'
import Footer from './Footer'
import Generos from './Generos'
import NovoGeneros from './NovoGenero'
import EditarGeneros from './EditarGeneros'

import Series from './Series'
import NovaSerie from './NovaSerie'
import InfoSerie from './InfoSerie'

import './style.css'

//BrowserRouter => para ficar limpinho, como /series e /generos
//Route => Que é minha rota
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const Home =()=>{
  return <h1>Home</h1>
}

function App() {
  //temos o projeto minhas-series-server como dependencia
  //e rodamos esse cara dessa forma:  node ./node_modules/minhas-series-server/index.js e ficara disponivel em "http://localhost:3002/"
  //é legal fazer as requisições de uma maneira mais simples, sem precisar colocar porta e tudo mais
  //para isso criamos no package.json criamos proxy, ele funciona só em desenvolvimento, e minhas requisições apontam para "http://localhost:3002/"

  //npm-run-all para executar os dois projetos ao mesmo tempo, primeiro buildar o react e depois rodar a api 
  return (
    <Router>
      <div className='App'>
        <Header />
        {/*exact => para ser extamente, caso contrario, ele pega que tem barra e acaba exibindo os dois componentes*/}
        <Switch>{/*se bateu ele vai para a proxima, antes pegava NovoGeneros e EditarGeneros, quando entrava em salvar novo*/}
          <Route path='/' exact component={Home}></Route>
          <Route path='/generos' exact component={Generos}></Route>
          <Route path='/generos/novo' exact component={NovoGeneros}></Route>
          <Route path='/generos/:id' exact component={EditarGeneros}></Route>
          <Route path='/series' exact component={Series}></Route>
          <Route path='/series/novo' exact component={NovaSerie}></Route>
          <Route path='/series/:id' exact component={InfoSerie}></Route>
        </Switch>
        <Footer/>
      </div>
    </Router>
  )
}

export default App;