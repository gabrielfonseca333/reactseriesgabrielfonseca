import React, { Component } from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import Home from './Home'
import Menu from './Menu'
import Serie from './Serie'
import Personajes from './Personajes'
import CrearPersonaje from './CrearPersonaje'
import ModificarPersonaje from './ModificarPersonaje'

export default class Router extends Component {
  render() {

    function SerieElement(){
        let {id} = useParams()
        return (<Serie id={id}/>)
    }

    function PersonajesElement(){
        let {id} = useParams()
        return (<Personajes id={id}/>)
    }


    return (
      <div>
        <BrowserRouter>
            <Menu/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/serie/:id' element={<SerieElement/>}/>
                <Route path='/personajes/:id' element={<PersonajesElement/>}/>
                <Route path='/crearpersonaje' element={<CrearPersonaje/>}/>
                <Route path='/modificarpersonaje' element={<ModificarPersonaje/>}/>
            </Routes>
        </BrowserRouter>
      </div>
    )
  }
}
