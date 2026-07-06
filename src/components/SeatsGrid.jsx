import React from 'react';
import SeatButton from './SeatButton';



export default function SeatsGrid({ seats, onSeatClick }) {
  if (seats.length === 0) {
    return <p className="text-muted">No hay asientos cargados para este sector.</p>;
  }

  // Obtener filas únicas ordenadas
  const uniqueRows = [...new Set(seats.map((s) => s.fila))].sort(
    (a, b) => Number(a) - Number(b)
  );

  return (
    <div className="grilla-asientos mx-auto" style={{ width: "fit-content" }} role="group" aria-label="Grilla de asientos">
      {uniqueRows.map((rowName) => {
        const rowSeats = seats
          .filter((s) => s.fila === rowName)
          .sort((a, b) => a.numero - b.numero);

        return (
          <div className="fila-asientos justify-content-center" key={rowName}>
            <span className="etiqueta-fila">{rowName}</span>
            {rowSeats.map((seat) => (
              <SeatButton key={seat.idAsiento} seat={seat} onClick={onSeatClick} />
            ))}
          </div>
        );
      })}
    </div>
  );
}
