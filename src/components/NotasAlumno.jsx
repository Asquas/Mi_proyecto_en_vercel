import React, { useState } from "react";

function NotasAlumno({ alumno, notas }) {
  const [mostrar, setMostrar] = useState(true);

  return (
    <div className="card">
      <h2>Notas</h2>

      {!alumno && (
        <p className="muted">Busca/selecciona un alumno para ver notas.</p>
      )}

      {alumno && notas && notas.length === 0 && (
        <p className="muted">Este alumno no tiene notas (o no se pudieron cargar).</p>
      )}

      {alumno && notas && notas.length > 0 && (
        <div className="notas">
          <button onClick={() => setMostrar(!mostrar)}>
            {mostrar ? "Ocultar notas" : "Mostrar notas"}
          </button>

          {mostrar ? (
            notas.map((n, idx) => {
              const codigo = n.codigo != null ? n.codigo : "";
              const nombre = n.nombre != null ? n.nombre : "";
              const notaActual = n.nota != null ? n.nota : "";

              return (
                <div key={idx} className="fila-nota">
                  <p><b>Codigo:</b> {codigo}</p>
                  <p><b>Asignatura:</b> {nombre}</p>
                  <p><b>Nota:</b> {String(notaActual)}</p>
                </div>
              );
            })
          ) : (
            <p className="muted">Notas ocultas.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default NotasAlumno;
