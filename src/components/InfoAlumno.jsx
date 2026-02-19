function InfoAlumno({ alumno }) {
  return (
    <div className="card">
      <h2>Datos del alumno</h2>

      {!alumno && <p className="muted">No hay alumno seleccionado.</p>}

      {alumno && (
        <div className="info">
          <p><b>ID:</b> {alumno.id}</p>
          <p><b>Nombre:</b> {alumno.nombre}</p>
          <p><b>Apellido1:</b> {alumno.apellido1}</p>
          <p><b>Apellido2:</b> {alumno.apellido2}</p>
          <p><b>Edad:</b> {alumno.edad}</p>
          <p><b>Curso:</b> {alumno.curso}</p>
          <p><b>Sexo:</b> {alumno.sexo}</p>

          {alumno.foto && (
            <img className="foto" src={alumno.foto} alt="foto alumno" />
          )}
        </div>
      )}
    </div>
  );
}

export default InfoAlumno;
