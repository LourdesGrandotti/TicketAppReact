
export default function SeatButton({ seat, onClick }) {
  const { idAsiento, fila, numero, sector, estado } = seat;

  let btnClass = 'btn-asiento';
  if (estado === 'disponible') btnClass += ' btn-disponible';
  if (estado === 'seleccionado') btnClass += ' btn-seleccionado';
  if (estado === 'ocupado') btnClass += ' btn-ocupado';

  return (
    <button
      type="button"
      className={btnClass}
      onClick={() => onClick(idAsiento)}
      disabled={estado === 'ocupado'}
      aria-label={`Asiento ${numero}, Fila ${fila} — Sector ${sector}`}
    />
  );
}

