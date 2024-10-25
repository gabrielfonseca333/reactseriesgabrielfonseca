import React, { Component } from "react";
import axios from "axios";
import Global from "./Global";
import { NavLink } from "react-router-dom";

export default class Menu extends Component {

    state = {

        series:[]

    }

    loadSeries=()=>{
        let request = "api/series"
        let url = Global.urlApiSeries + request
        axios.get(url).then(response=>{
            this.setState({
                series:response.data
            })
        })
    }

    componentDidMount=()=>{
        this.loadSeries()
    }




  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">
              Gabriel Fonseca
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/crearpersonaje">
                    Nuevo Personaje
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/modificarpersonaje">
                    Modificar Personaje
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Series
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    {
                        //aqui es donde deben ir los li con los nav link
                        this.state.series.map((serie, index)=>{
                            return(<li><NavLink to={"/serie/" + serie.idSerie}>{serie.nombre}</NavLink></li>)
                        })
                    }
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
