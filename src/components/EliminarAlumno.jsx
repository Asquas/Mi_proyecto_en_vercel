import { useState } from "react";

function EliminarAlumno({ alumnoSeleccionado, onEliminar }) {
  const [id, setId] = useState("");

  return (
    <div className="card">
      <h2>Eliminar alumno</h2>

      <input
        type="number"
        placeholder="ID a eliminar"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <button onClick={() => onEliminar(id)}>Eliminar por ID</button>

      <hr className="separador" />

      <button
        className="peligro"
        disabled={!alumnoSeleccionado}
        onClick={() => onEliminar(alumnoSeleccionado.id)}
      >
        Eliminar alumno seleccionado
      </button>

      {!alumnoSeleccionado && (
        <p className="muted">Selecciona un alumno para poder borrarlo aqui.</p>
      )}
    </div>
  );
}

export default EliminarAlumno;
