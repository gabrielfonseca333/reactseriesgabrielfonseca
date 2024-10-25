import React, { Component } from "react";
import axios from "axios";
import Global from "./Global";
import { Navigate } from "react-router-dom";

export default class ModificarPersonaje extends Component {
  selectSerie = React.createRef();
  selectPersonaje = React.createRef();

  state = {
    series: [],
    personajes: [],
    status: false,
    idserie: 0,
    mostrarSerie: false,
    serie: null,
    mostrarPersonaje: false,
    personaje: null,
  };

  mostrarSerie = () => {
    console.log("Mostrar serie aquí");
    this.findSerie();
  };

  findSerie = () => {
    var idserie = parseInt(this.selectSerie.current.value);
    let request = "api/series/" + idserie;
    let url = Global.urlApiSeries + request;
    axios.get(url).then((response) => {
      this.setState({
        serie: response.data,
        mostrarSerie: true,
      });
    });
  };

  mostrarPersonaje = () => {
    this.findPersonaje();
  };

  findPersonaje = () => {
    let idpersonaje = parseInt(this.selectPersonaje.current.value);
    let request = "api/personajes/" + idpersonaje;
    let url = Global.urlApiSeries + request;
    axios.get(url).then((response) => {
      this.setState({
        personaje: response.data,
        mostrarPersonaje: true,
      });
    });
  };

  updatePersonaje = (e) => {
    e.preventDefault();

    let idPersonaje = parseInt(this.selectPersonaje.current.value);
    var idserie = parseInt(this.selectSerie.current.value);

    let request = "api/personajes/" + idPersonaje + "/" + idserie;
    let url = Global.urlApiSeries + request;

    axios.put(url).then((response) => {
      console.log("Personaje modificado de serie");
      this.setState({
        status: true,
        idserie: idserie,
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

  loadPersonajes = () => {
    let request = "/api/personajes";
    let url = Global.urlApiSeries + request;
    axios.get(url).then((response) => {
      this.setState({
        personajes: response.data,
      });
    });
  };

  componentDidMount = () => {
    this.loadSeries();
    this.loadPersonajes();
  };

  render() {
    if (this.state.status == true) {
      return <Navigate to={"/personajes/" + this.state.idserie} />;
    } else {
      return (
        <div>
          <h1>Modificar Personaje</h1>
          <div className="container">
            <form>
              <select
                onChange={this.mostrarPersonaje}
                className="form-control"
                ref={this.selectSerie}
              >
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
              <br />

              <select
                onChange={this.mostrarSerie}
                className="form-control"
                ref={this.selectPersonaje}
              >
                {this.state.personajes.map((personaje, index) => {
                  return (
                    <option key={index} value={personaje.idPersonaje}>
                      {personaje.nombre}
                    </option>
                  );
                })}
              </select>

              <button
                className="btn btn-primary"
                onClick={this.updatePersonaje}
              >
                Modificar
              </button>
            </form>
          </div>
          <hr />
          <div style={{ border: "1px solid blue" }} className="container">
            <table>
              <tr>
                <td>
                  {this.state.personaje &&
                    //mostrar personaje
                    this.state.mostrarPersonaje == true && (
                      <div>
                        <img
                          style={{ width: "500px" }}
                          src={this.state.personaje.imagen}
                        />
                      </div>
                    )}
                </td>
                <td>
                  {this.state.serie &&
                    //mostrar serie
                    this.state.mostrarSerie == true && (
                      <div>
                        <img
                          style={{ width: "500px" }}
                          src={this.state.serie.imagen}
                        />
                      </div>
                    )}
                </td>
              </tr>
            </table>
          </div>
        </div>
      );
    }
  }
}
