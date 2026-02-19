import { useState } from "react";

function NuevoAlumno({ onCrear }) {
  const [nombre, setNombre] = useState("");
  const [apellido1, setApellido1] = useState("");
  const [apellido2, setApellido2] = useState("");
  const [edad, setEdad] = useState("");
  const [curso, setCurso] = useState("");
  const [sexo, setSexo] = useState("");

  const crear = () => {
    onCrear({
      nombre,
      apellido1,
      apellido2,
      edad,
      curso,
      sexo,
    });

    // limpiamos 
    setNombre("");
    setApellido1("");
    setApellido2("");
    setEdad("");
    setCurso("");
    setSexo("");
  };

  return (
    <div className="card">
      <h2>Nuevo alumno</h2>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        type="text"
        placeholder="Apellido 1"
        value={apellido1}
        onChange={(e) => setApellido1(e.target.value)}
      />

      <input
        type="text"
        placeholder="Apellido 2"
        value={apellido2}
        onChange={(e) => setApellido2(e.target.value)}
      />

      <input
        type="number"
        placeholder="Edad"
        value={edad}
        onChange={(e) => setEdad(e.target.value)}
      />

      <input
        type="text"
        placeholder="Curso"
        value={curso}
        onChange={(e) => setCurso(e.target.value)}
      />

      <input
        type="text"
        placeholder="Sexo (M/F)"
        value={sexo}
        onChange={(e) => setSexo(e.target.value)}
      />

      <button onClick={crear}>Crear alumno</button>
    </div>
  );
}

export default NuevoAlumno;
