import { useState } from "react";

function BuscarAlumno({ onBuscar }) {
  const [id, setId] = useState("");

  return (
    <div className="card">
      <h2>Buscar alumno</h2>

      <input
        type="number"
        placeholder="ID del alumno"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <button onClick={() => onBuscar(id)}>Buscar</button>
    </div>
  );
}

export default BuscarAlumno;
