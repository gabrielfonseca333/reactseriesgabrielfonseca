import React, { Component } from "react";
import Global from "./Global";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default class CrearPersonaje extends Component {
  cajaid = React.createRef();
  cajanombre = React.createRef();
  cajaimagen = React.createRef();
  cajaidserie = React.createRef();

  state = {
    series: [],
    status: false,
    idSerie: 0,
  };

  crearPersonaje = (e) => {
    e.preventDefault();

    let id = parseInt(this.cajaid.current.value);
    let nombre = this.cajanombre.current.value;
    let imagen = this.cajaimagen.current.value;
    var idserie = parseInt(this.cajaidserie.current.value);

    let request = "api/personajes"
    let url = Global.urlApiSeries + request;

    let personaje = {
        idPersonaje: id,
        nombre: nombre,
        imagen: imagen,
        idSerie: idserie
    }

    axios.post(url, personaje).then(response => {
      console.log("Personaje Creado! " + id);
      this.setState({
        status: true,
        idSerie: idserie,
      });
    });


  };



  loadSeries = () => {
    let request = "api/series";
    let url = Global.urlApiSeries + request;
    axios.get(url).then((response) => {
      this.setState({
        series: response.data,
      });
    });
  };

  componentDidMount = () => {
    this.loadSeries();
  };

  render() {
    if (this.state.status == true) {
      return <Navigate to={"/personajes/" + this.state.idSerie} />;
    } else {
        return (
            <div className="container">
              <h1>Crear Personaje</h1>
              <hr />
              <div className="container">
                <form>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="idPersonaje"
                    ref={this.cajaid}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="nombre"
                    ref={this.cajanombre}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="imagen"
                    ref={this.cajaimagen}
                  />
                  <select className="form-control" ref={this.cajaidserie}>
                    {
                      //cargar options con las series
                      this.state.series.map((serie, index) => {
                        return (
                          <option key={index} value={serie.idSerie}>
                            {serie.nombre}
                          </option>
                        );
                      })
                    }
                  </select>
                  <button className="btn btn-primary" onClick={this.crearPersonaje}>
                    Crear
                  </button>
                </form>
              </div>
            </div>
          );
    }
    
  }
}
