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
  { codigo: 1, producto: "Gafas sol ", precio: 100.000, cantidad: 1, total: 100.000},
  { codigo: 2, producto: "Gafas lente especial ", precio: 100.000, cantidad: 1, total: 100.000},
  { codigo: 3, producto: "Gafas sencilla", precio: 100.000 , cantidad: 1, total: 100.000},
  { codigo: 4, producto: "Gafas marco bambú", precio: 100.000, cantidad: 1, total: 100.000},
  { codigo: 5, producto: "Gafas negras ", precio: 100.000, cantidad: 1, total: 100.000},
  { codigo: 6, producto: "Gafas x", precio: 100.000, cantidad: 1, total: 100.000},
];

class Ventas extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      codigo: "",
      producto: "",
      precio: "",
      cantidad: "",
      total:"",
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
    arreglo.map((Registro) => {
      if (dato.codigo == Registro.codigo) {
        arreglo[contador].producto = dato.producto;
        arreglo[contador].precio = dato.precio;
        arreglo[contador].cantidad = dato.cantidad;
        arreglo[contador].total = dato.total;

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
      arreglo.map((Registro) => {
        if (dato.codigo == Registro.codigo) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar= ()=>{
    var valorNuevo= {...this.state.form};
    valorNuevo.id=this.state.data.length+1;
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
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Nueva venta</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Total</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.codigo}>
                  <td>{dato.codigo}</td>
                  <td>{dato.producto}</td>
                  <td>{dato.precio}</td>
                  <td>{dato.cantidad}</td>
                  <td>{dato.total}</td>

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
                Producto: 
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
                Precio: 
              </label>
              <input
                className="form-control"
                name="precio"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.anime}// este anime qué?
              />
            </FormGroup>

            <FormGroup>
              <label>
                Cantidad: 
              </label>
              <input
                className="form-control"
                name="cantidad"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.anime}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Total: 
              </label>
              <input
                className="form-control"
                name="total"
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
           <div><h3>Insertar Usuario</h3></div>
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
                Cantidad: 
              </label>
              <input
                className="form-control"
                name="cantidad"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Total: 
              </label>
              <input
                className="form-control"
                name="total"
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
export default Ventas;