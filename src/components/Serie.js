import React, { Component } from 'react'
import Global from './Global'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

export default class Serie extends Component {

    state = {
        serie:null,
    }

    findSerie=()=>{
        let id = this.props.id
        let request = "api/series/" + id
        let url = Global.urlApiSeries + request
        axios.get(url).then(response=>{
            this.setState({
                serie:response.data,
            })
        })
    }

    componentDidMount=()=>{
        this.findSerie()
    }

    componentDidUpdate=(prevProps)=>{

        if(this.props.id != prevProps.id){
            this.findSerie()
        }
    }


  render() {
    return (
      <div>
        {
            this.state.serie &&
            (<div className='container'>
                <h1>{this.state.serie.nombre}</h1>
                <hr/>
                <img style={{width:"250px"}} src={this.state.serie.imagen}/>
                <p>Puntuación: {this.state.serie.puntuacion}</p>
                <NavLink className="btn btn-primary" to={"/personajes/" + this.state.serie.idSerie}>Personajes</NavLink>
            </div>)
        }
        
      </div>
    )
  }
}
