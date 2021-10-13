import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import fireDb from "../firebase"
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



class Usuarios extends React.Component {
  state = {
    data: [],
    modalInsertar:false,
    modalEditar: false,
    form: {
      identificacion: "",
      apellido: "",
      nombre: "",
      correo:"",
    },
    id:0
  };
  peticionGet = () => {
    fireDb.child("usuarios").on("value", (usuario) => {
      if (usuario.val() !== null) {
        this.setState({ ...this.state.data, data: usuario.val() });
      } else {
        this.setState({ data: [] });
      }
    });
  };
  peticionPost=()=>{
    console.log(this.state.form)
    fireDb.child("usuarios").push(this.state.form,
      error=>{
        if(error)console.log(error)
      });
      this.setState({modalInsertar: false});
  }
  peticionPut=()=>{
    fireDb.child(`usuarios/${this.state.id}`).set(
      this.state.form,
      error=>{
        if(error)console.log(error)
      });
      this.setState({modalEditar: false});
  }
  peticionDelete=()=>{
    if(window.confirm(`Estás seguro que deseas eliminar el usuario ${this.state.form && this.state.form.identificacion}?`))
    {
    fireDb.child(`usuarios/${this.state.id}`).remove(
      error=>{
        if(error)console.log(error)
      });
    }
  }
  handleChange=e=>{
    this.setState({form:{
      ...this.state.form,
      [e.target.name]: e.target.value
    }})
    console.log(this.state.form);
  }
  seleccionarUsuario=async(usuario,id,caso)=>{

    await this.setState({form: usuario, id: id});

    (caso==="Editar")?this.setState({modalEditar: true}):
    this.peticionDelete()

  }
  componentDidMount(){
    this.peticionGet();
  }
  render() {
    
    return (
      <>
        <Container>
        <br />
          <Button color="success" onClick={()=>this.setState({modalInsertar: true})}>Nuevo Usuario</Button>
          <br />
          <br />
          <Table className="table table-bordered">
            <thead>
              <tr>
                
                <th>Identificacion</th>
                <th>Apellido</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {Object.keys(this.state.data).map(i => {
                return <tr key={i}>
                  
                  <td>{this.state.data[i].identificacion}</td>
                  <td>{this.state.data[i].apellido}</td>
                  <td>{this.state.data[i].nombre}</td>
                  <td>{this.state.data[i].correo}</td>
                  <td>
                    <Button color="primary" onClick={() => this.seleccionarUsuario(this.state.data[i],i,'Editar')}>Editar</Button>{" "}
                    <Button color="danger" onClick={()=> this.seleccionarUsuario(this.state.data[i],i,'Eliminar')}>Eliminar</Button>
                  </td>

                </tr>
               })}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalEditar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            
            <FormGroup>
              <label>
              Identificacion: 
              </label>
              <input
                className="form-control"
                name="identificacion"
                type="number"
                onChange={this.handleChange}
                value={this.state.form && this.state.form.identificacion}
                
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Apellido: 
              </label>
              <input
                className="form-control"
                name="apellido"
                type="text"
                onChange={this.handleChange}
                value={this.state.form && this.state.form.apellido}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form && this.state.form.nombre}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Correo: 
              </label>
              <input
                className="form-control"
                name="correo"
                type="text"
                onChange={this.handleChange}
                value={this.state.form && this.state.form.correo}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.peticionPut()}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.setState({modalEditar: false})}
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
              Identificacion: 
              </label>
              <input
                className="form-control"
                name="identificacion"
                type="number"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Apellido: 
              </label>
              <input
                className="form-control"
                name="apellido"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>


            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Correo: 
              </label>
              <input
                className="form-control"
                name="correo"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.peticionPost()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.setState({modalInsertar: false})}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default Usuarios;