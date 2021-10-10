import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const data = [
  { codigo: 1, producto: "Gafas sol ", precio: 100.000, descripción: "Especial para los rayos uv"},
  { codigo: 2, producto: "Gafas lente especial ", precio: 100.000, descripción: "Lente especial de lectura y descanso"},
  { codigo: 3, producto: "Gafas sencilla", precio: 100.000 , descripción: "Comodidad y sencillez"},
  { codigo: 4, producto: "Gafas marco bambú", precio: 100.000,descripción: "Material de bambú, mayor duración y ecologico" },
  { codigo: 5, producto: "Gafas negras ", precio: 100.000,descripción:"Un color" },
  { codigo: 6, producto: "LGafas x ", precio: 100.000, descripción: "Gafas con filtro especial" },
];

class Productos extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      codigo: "",
      producto: "",
      precio: "",
      descripción: "",
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.codigo == registro.codigo) {
        arreglo[contador].producto = dato.producto;
        arreglo[contador].precio = dato.precio;
        arreglo[contador].descripción = dato.descripción;

      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.codigo);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.codigo == registro.codigo) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar= ()=>{
    var valorNuevo= {...this.state.form};
    valorNuevo.codigo=this.state.data.length+1;
    var lista= this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    
    return (
      <>
        <Container>
        <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Nuevo Producto</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Descripción</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.codigo}>
                  <td>{dato.codigo}</td>
                  <td>{dato.producto}</td>
                  <td>{dato.precio}</td>
                  <td>{dato.descripción}</td>

                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Codigo:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.codigo}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                producto: 
              </label>
              <input
                className="form-control"
                name="producto"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.producto}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                precio: 
              </label>
              <input
                className="form-control"
                name="precio"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.anime}
              />
            </FormGroup>

            <FormGroup>
              <label>
                descripción: 
              </label>
              <input
                className="form-control"
                name="descripcion"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.anime}
              />
            </FormGroup>

          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar Producto</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Codigo: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Producto: 
              </label>
              <input
                className="form-control"
                name="producto"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Precio: 
              </label>
              <input
                className="form-control"
                name="precio"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>


            <FormGroup>
              <label>
                Descripción: 
              </label>
              <input
                className="form-control"
                name="descripcion"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default Productos;