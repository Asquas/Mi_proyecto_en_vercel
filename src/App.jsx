import { useEffect, useState } from "react";
import "./App.css";

import BuscarAlumno from "./components/BuscarAlumno";
import InfoAlumno from "./components/InfoAlumno";
import NuevoAlumno from "./components/NuevoAlumno";
import EliminarAlumno from "./components/EliminarAlumno";
import NotasAlumno from "./components/NotasAlumno";

function App() {
  let url = "https://servidorclasedaw.onrender.com";
  let espacio = "alumno6";

  const [alumno, setAlumno] = useState(null);   // alumno seleccionado
  const [notas, setNotas] = useState([]);       // notas del alumno seleccionado
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const [vista, setVista] = useState("buscar");

  //  GET Alumno 
  const obtenerAlumno = (id) => {
    if (id === "" || id == null) return;

    setError(null);
    setMensaje(null);
    setAlumno(null);
    setNotas([]);

    fetch(`${url}/${espacio}/alumnos/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("El alumno no esta en la Base de Datos");
        }
        return res.json();
      })
      .then((data) => setAlumno(data))
      .catch((err) => setError(err.message));
  };

  // GET Notas
  const obtenerNotas = (id) => {
    if (id === "" || id == null) return;

    setError(null);

    fetch(`${url}/${espacio}/alumnos/${id}/notas`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("No se pudieron obtener las notas");
        }
        return res.json();
      })
      .then((data) => setNotas(data))
      .catch((err) => setError(err.message));
  };

  // cargar notas
  useEffect(() => {
    if (alumno && alumno.id != null) {
      obtenerNotas(alumno.id);
    }
  }, [alumno]);

  // POST CREAR ALUMNO 
  const crearAlumno = (nuevo) => {
    setError(null);
    setMensaje(null);

    if (!nuevo.nombre || !nuevo.apellido1 || !nuevo.apellido2 || !nuevo.edad || !nuevo.curso || !nuevo.sexo) {
      setError("Todos los campos son obligatorios");
      return;
    }

    fetch(`${url}/${espacio}/alumnos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: nuevo.nombre,
        apellido1: nuevo.apellido1,
        apellido2: nuevo.apellido2,
        edad: Number(nuevo.edad),
        curso: Number(nuevo.curso),
        sexo: String(nuevo.sexo).toUpperCase(),
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al crear el alumno");
        }
        return res.json();
      })
      .then(() => setMensaje("Alumno creado correctamente"))
      .catch((err) => setError(err.message));
  };

  // DELETE 
  const eliminarAlumno = (id) => {
    if (id === "" || id == null) return;

    setError(null);
    setMensaje(null);

    fetch(`${url}/${espacio}/alumnos/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("No se pudo eliminar el alumno");
        }
      })
      .then(() => {
        setMensaje("Alumno eliminado correctamente");

        // limpia pantalla
        if (alumno && String(alumno.id) === String(id)) {
          setAlumno(null);
          setNotas([]);
        }
      })
      .catch((err) => setError(err.message));
  };

  return (
    <>
      <header className="header">
        <h1>Gestion de Alumnos</h1>
        <div className="nav">
          <button className="nav-btn" onClick={() => setVista("buscar")}>Buscar alumnos</button>
          <button className="nav-btn" onClick={() => setVista("crear")}>Crear alumno</button>
        </div>
      </header>

      <main className="contenido">
        {vista === "buscar" ? (
          <>
            <section className="izquierda">
              <BuscarAlumno onBuscar={obtenerAlumno} />

              <EliminarAlumno
                alumnoSeleccionado={alumno}
                onEliminar={eliminarAlumno}
              />
            </section>

            <section className="derecha">
              <InfoAlumno alumno={alumno} />

              <NotasAlumno
                alumno={alumno}
                notas={notas}
              />

              {mensaje && <p className="ok">{mensaje}</p>}
              {error && <p className="error">{error}</p>}
            </section>
          </>
        ) : ( 
          <section className="izquierda">
            <NuevoAlumno onCrear={crearAlumno} />
            {mensaje && <p className="ok">{mensaje}</p>}
            {error && <p className="error">{error}</p>}
          </section>
        )}
      </main>

      <footer className="footer">
        <p>2026 Todos los derechos reservados</p>
      </footer>
    </>
  );
}

export default App;
