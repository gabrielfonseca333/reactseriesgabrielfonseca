import React, { Component } from 'react'
import Global from './Global'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

export default class Personajes extends Component {

    state = {
        personajes: []
    }

    loadPersonajes=()=>{
        let id = this.props.id
        let request = "/api/series/personajesserie/" + id
        let url = Global.urlApiSeries + request
        axios.get(url).then(response=>{
            this.setState({
                personajes:response.data
            })
        })
    }

    componentDidMount=()=>{
        this.loadPersonajes()
    }



  render() {
    return (
      <div className='container'>

        <h1>Personajes de: {this.props.id}</h1>
        <NavLink className="btn btn-danger" to={"/serie/" + this.props.id}>Volver a Serie</NavLink>
        <table className='table table-hover'>
            <thead>
                <tr className='table-dark'>
                    <th>Personaje</th>
                    <th>Imagen</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.personajes.map((personaje, index)=>{
                        return(<tr>
                            <td>{personaje.nombre}</td>
                            <td><img style={{width:"250px"}}src={personaje.imagen}/></td>
                        </tr>)
                    })
                }
            </tbody>
        </table>
      </div>
    )
  }
}
