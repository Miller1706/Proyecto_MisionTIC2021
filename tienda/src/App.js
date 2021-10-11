import logo from './logo.svg';
import './App.css';
import Usuarios from './componentes/Usuarios';
import Ventas from './componentes/Ventas';
import Productos from './componentes/Productos';
import firebase from './firebase';
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
   <>
   
   <Usuarios></Usuarios>
    <Ventas></Ventas>
    <Productos></Productos>
  </>
  );
}

export default App;
