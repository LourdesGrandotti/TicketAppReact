import { useState, useEffect, useCallback, useMemo } from 'react';
import { useCart } from '../context/CartContext.jsx';

// Precios configurables por zona de estadio
const PRECIOS_POR_ZONA = {
  A: 270000,
  B: 180000,
  C: 140000,
  D: 350000,
};

const FILAS_SECTOR = 8;
const ASIENTOS_POR_FILA = 6;
const CLAVE_SELECCION_GLOBAL = 'ticketapp_asientos_seleccionados';

export default function useSeating(sectorId = 'A1', partidoId = '', initialLimit = 1) {
  const { items, agregarItem, quitarItem } = useCart();
  const [seats, setSeats] = useState([]);
  const [alerta, setAlerta] = useState('');

  // Derivamos nuestros asientos seleccionados directamente de CartContext
  const selectedSeats = useMemo(
    () =>
      items
        .filter(
          (item) =>
            item.tipo === 'asiento' &&
            String(item.partidoId) === String(partidoId) &&
            item.sector === sectorId
        )
        .map((item) => item.id),
    [items, partidoId, sectorId]
  );

  // Auxiliar para generar el mapa de asientos
  const generateSeats = useCallback((sector, partido, ownSelected) => {
    const zona = sector.charAt(0).toUpperCase();
    const precio = PRECIOS_POR_ZONA[zona] || 270000;

    // Obtener asientos comprados para este partido (simulando checkout en base de datos)
    const compras = JSON.parse(localStorage.getItem('compras')) || [];
    const asientosComprados = [];
    compras.forEach((compra) => {
      if (String(compra.id_partido) === String(partido)) {
        asientosComprados.push(...(compra.asientos || []));
      }
    });

    // Obtener asientos elegidos por otras pestañas (simulación de concurrencia)
    const globalSelected = JSON.parse(localStorage.getItem(CLAVE_SELECCION_GLOBAL)) || [];

    const generated = [];
    for (let f = 1; f <= FILAS_SECTOR; f++) {
      const fila = String(f);
      for (let n = 1; n <= ASIENTOS_POR_FILA; n++) {
        const idAsiento = `${sector}-${fila}-${n}`;
        let estado = 'disponible';

        if (asientosComprados.includes(idAsiento)) {
          estado = 'ocupado';
        } else if (ownSelected.includes(idAsiento)) {
          estado = 'seleccionado';
        } else if (globalSelected.includes(idAsiento)) {
          estado = 'ocupado'; // Bloqueado por otra pestaña
        }

        generated.push({
          idAsiento,
          idSector: sector,
          sector,
          fila,
          numero: n,
          precio,
          estado,
        });
      }
    }
    return generated;
  }, []);

  // Inicializar y actualizar asientos cuando cambian los parámetros o selecciones
  useEffect(() => {
    const generated = generateSeats(sectorId, partidoId, selectedSeats);
    setSeats(generated);
  }, [sectorId, partidoId, selectedSeats, generateSeats]);

  // Reaccionar a cambios en tiempo real desde otras pestañas
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === CLAVE_SELECCION_GLOBAL) {
        setSeats((prevSeats) => {
          const globalSelected = e.newValue ? JSON.parse(e.newValue) : [];
          return prevSeats.map((seat) => {
            // Mantener nuestra propia selección
            if (selectedSeats.includes(seat.idAsiento)) {
              return { ...seat, estado: 'seleccionado' };
            }
            // Bloquear selecciones globales de otros
            if (globalSelected.includes(seat.idAsiento)) {
              return { ...seat, estado: 'ocupado' };
            }
            // Mantener compras ocupadas
            if (seat.estado === 'ocupado' && !globalSelected.includes(seat.idAsiento)) {
              const compras = JSON.parse(localStorage.getItem('compras')) || [];
              const asientosComprados = [];
              compras.forEach((compra) => {
                if (String(compra.id_partido) === String(partidoId)) {
                  asientosComprados.push(...(compra.asientos || []));
                }
              });
              if (asientosComprados.includes(seat.idAsiento)) {
                return seat;
              }
            }
            return { ...seat, estado: 'disponible' };
          });
        });
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [partidoId, selectedSeats]);

  const persistSelections = (nuevasSelecciones) => {
    // Sincronizar con almacenamiento global (para simulación de pestañas concurrente)
    const globalOld = JSON.parse(localStorage.getItem(CLAVE_SELECCION_GLOBAL)) || [];
    const globalSinMisViejas = globalOld.filter((id) => !selectedSeats.includes(id));
    const globalNueva = [...globalSinMisViejas, ...nuevasSelecciones];
    localStorage.setItem(CLAVE_SELECCION_GLOBAL, JSON.stringify(globalNueva));

    // Remover del CartContext lo que ya no está seleccionado
    selectedSeats.forEach((id) => {
      if (!nuevasSelecciones.includes(id)) {
        quitarItem(id);
      }
    });

    // Agregar al CartContext lo que se seleccionó recientemente
    nuevasSelecciones.forEach((id) => {
      if (!selectedSeats.includes(id)) {
        const seatObj = seats.find((s) => s.idAsiento === id);
        if (seatObj) {
          agregarItem({
            id: seatObj.idAsiento,
            nombre: `Sector ${sectorId} — Fila ${seatObj.fila}, Asiento ${seatObj.numero}`,
            precio: seatObj.precio,
            tipo: 'asiento',
            partidoId: partidoId,
            sector: sectorId,
            fila: seatObj.fila,
            numero: seatObj.numero,
          });
        }
      }
    });
  };

  const toggleSeat = (idAsiento) => {
    const seatObj = seats.find((s) => s.idAsiento === idAsiento);
    if (!seatObj || seatObj.estado === 'ocupado') return;

    let nuevasSelecciones = [...selectedSeats];

    if (seatObj.estado === 'disponible') {
      if (nuevasSelecciones.length >= initialLimit) {
        setAlerta(`Límite alcanzado: podés seleccionar hasta ${initialLimit} ${initialLimit === 1 ? 'asiento' : 'asientos'} para este sector.`);
        setTimeout(() => setAlerta(''), 4000);
        return;
      }
      nuevasSelecciones.push(idAsiento);
    } else {
      nuevasSelecciones = nuevasSelecciones.filter((id) => id !== idAsiento);
    }

    persistSelections(nuevasSelecciones);
  };

  const removeSeat = (idAsiento) => {
    const nuevasSelecciones = selectedSeats.filter((id) => id !== idAsiento);
    persistSelections(nuevasSelecciones);
  };

  const clearSelections = () => {
    persistSelections([]);
  };

  return {
    seats,
    selectedSeats,
    alerta,
    toggleSeat,
    removeSeat,
    clearSelections,
  };
}
