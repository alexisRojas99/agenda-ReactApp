import React, { useEffect, useState } from 'react'
import { dbFireStore } from './firebaseConfig'

function App() {

  const [modoedicion, setModoEdicion] = useState(false)
  const [iduser, setIdUser] = useState('')
  const [nombre, setNombre] = useState('')
  const [phone, setPhone] = useState('')
  const [usuariosagenda, setUsuariosAgenda] = useState([])

  const [error, setError] = useState('')

  useEffect(() => {
    const getUsuarios = async () => {
      const { docs } = await dbFireStore.collection('agenda').get()
      const nuevoArray = docs.map(item => ({ id: item.id, ...item.data() }))
      setUsuariosAgenda(nuevoArray)
    }
    getUsuarios()
  }, [])

  const setUsuarios = async (e) => {
    e.preventDefault()

    if (!nombre.trim()) {
      setError('El Campo Nombre esta Vacio')
    } else if (!phone.trim()) {
      setError('El Campo Numero esta Vacio')
    }

    if (nombre && phone) {
      const usuario = {
        Nombre: nombre,
        Telefono: phone
      }

      try {
        const data = await dbFireStore.collection('agenda').add(usuario)
        console.log('Tarea Añadida')

        const { docs } = await dbFireStore.collection('agenda').get()
        const nuevoArray = docs.map(item => ({ id: item.id, ...item.data() }))
        setUsuariosAgenda(nuevoArray)

        alert('Usuario Añadido');
      } catch (e) {
        console.log(e)
      }
      setNombre('')
      setPhone('')
      setError('')
    }

  }

  const deleteUsuario = async (id) => {
    try {
      await dbFireStore.collection('agenda').doc(id).delete()
      const { docs } = await dbFireStore.collection('agenda').get()
      const nuevoArray = docs.map(item => ({ id: item.id, ...item.data() }))
      setUsuariosAgenda(nuevoArray)
    } catch (e) {
      console.log(e)
    }
  }

  const pulsarActualizar = async (id) => {

    try {
      const data = await dbFireStore.collection('agenda').doc(id).get()
      const { Nombre, Telefono } = data.data()
      setNombre(Nombre)
      setPhone(Telefono)
      setIdUser(id)
      setModoEdicion(true)

      // console.log(id)
      // console.log(data.data())
    } catch (e) {
      console.log(e)
    }

  }

  const setUpdate = async (e) => {
    e.preventDefault()
    if (!nombre.trim()) {
      setError('El Campo Nombre esta Vacio')
    } else if (!phone.trim()) {
      setError('El Campo Numero esta Vacio')
    }

    if (nombre && phone) {
      const userUpdate = {
        Nombre: nombre,
        Telefono: phone
      }

      try {
        await dbFireStore.collection('agenda').doc(iduser).set(userUpdate)
        const { docs } = await dbFireStore.collection('agenda').get()
        const nuevoArray = docs.map(item => ({ id: item.id, ...item.data() }))
        setUsuariosAgenda(nuevoArray)
      } catch (e) {
        console.log(e)
      }
      setNombre('')
      setPhone('')
      setModoEdicion(false)
      setError('')
    }

  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-4">
          <h2>Formulario de Usuarios</h2>
          <form onSubmit={modoedicion ? setUpdate : setUsuarios} className="form-group">
            <div className="mt-3">
              <input onChange={(e) => { setNombre(e.target.value) }} type="text" className="form-control" placeholder="Ingresa el Nombre" value={nombre} />
            </div>
            <div>
              <input onChange={(e) => { setPhone(e.target.value) }} type="text" className="form-control mt-2" placeholder="Ingresa el Numero" value={phone} />
            </div>
            <div className="d-grid gap-2 col-12 mt-3">
              <input type="submit" className="btn btn-dark" value={modoedicion ? 'Editar' : 'Registrar'} />
            </div>
          </form>

          {
            error ?
              <div className="alert alert-warning mt-3" role="alert">
                {error}
              </div>
              : <span></span>
          }


        </div>
        <div className="col-5">
          <h2>Lista de tu Agenda</h2>
          <ul className="list-group mr-4">
            {
              usuariosagenda.length !== 0 ?
                usuariosagenda.map(item => (
                  <li key={item.id} className="list-group-item">{item.Nombre} -- {item.Telefono}

                    <button onClick={(id) => { deleteUsuario(item.id) }} type="button" className="btn btn-danger float-end">Eliminar</button>

                    <button onClick={(id) => { pulsarActualizar(item.id) }} type="button" className="btn btn-info me-2 float-end">Modificar</button>

                  </li>
                ))
                :
                <span className="alert alert-indo" role="alert">Lo siento no hay tareas que mostrar</span>
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
