import React from "react";

// Partidos de muestra para la inicialización por defecto
export const PARTIDOS_MUESTRA = [
  {
    id: 1001,
    codigoEquipo1: 'za',
    nombreEquipo1: 'Sudáfrica',
    codigoEquipo2: 'ca',
    nombreEquipo2: 'Canadá',
    fecha: '2026-06-28T16:00',
    sectores: [
      { nombre: 'Sector VIP', precio: 5000 },
      { nombre: 'Sector Platea', precio: 5000 },
      { nombre: 'Sector General', precio: 5000 },
      { nombre: 'Sector Popular', precio: 5000 }
    ],
    estado: 'finalizado'
  },
  {
    id: 1002,
    codigoEquipo1: 'br',
    nombreEquipo1: 'Brasil',
    codigoEquipo2: 'jp',
    nombreEquipo2: 'Japón',
    fecha: '2026-06-29T14:00',
    sectores: [
      { nombre: 'Sector VIP', precio: 5000 },
      { nombre: 'Sector Platea', precio: 5000 },
      { nombre: 'Sector General', precio: 5000 },
      { nombre: 'Sector Popular', precio: 5000 }
    ],
    estado: 'finalizado'
  },
  {
    id: 1003,
    codigoEquipo1: 'de',
    nombreEquipo1: 'Alemania',
    codigoEquipo2: 'py',
    nombreEquipo2: 'Paraguay',
    fecha: '2026-06-29T17:30',
    sectores: [
      { nombre: 'Sector VIP', precio: 5000 },
      { nombre: 'Sector Platea', precio: 5000 },
      { nombre: 'Sector General', precio: 5000 },
      { nombre: 'Sector Popular', precio: 5000 }
    ],
    estado: 'finalizado'
  },
  {
    id: 1004,
    codigoEquipo1: 'nl',
    nombreEquipo1: 'Países Bajos',
    codigoEquipo2: 'ma',
    nombreEquipo2: 'Marruecos',
    fecha: '2026-06-29T22:00',
    sectores: [
      { nombre: 'Sector VIP', precio: 5000 },
      { nombre: 'Sector Platea', precio: 5000 },
      { nombre: 'Sector General', precio: 5000 },
      { nombre: 'Sector Popular', precio: 5000 }
    ],
    estado: 'finalizado'
  },
  {
    id: 1005,
    codigoEquipo1: 'ci',
    nombreEquipo1: 'Costa de Marfil',
    codigoEquipo2: 'no',
    nombreEquipo2: 'Noruega',
    fecha: '2026-06-30T14:00',
    sectores: [
      { nombre: 'Sector VIP', precio: 5000 },
      { nombre: 'Sector Platea', precio: 5000 },
      { nombre: 'Sector General', precio: 5000 },
      { nombre: 'Sector Popular', precio: 5000 }
    ],
    estado: 'finalizado'
  },
  {
    id: 1006,
    codigoEquipo1: 'fr',
    nombreEquipo1: 'Francia',
    codigoEquipo2: 'se',
    nombreEquipo2: 'Suecia',
    fecha: '2026-06-30T18:00',
    sectores: [
      { nombre: 'Sector VIP', precio: 5000 },
      { nombre: 'Sector Platea', precio: 5000 },
      { nombre: 'Sector General', precio: 5000 },
      { nombre: 'Sector Popular', precio: 5000 }
    ],
    estado: 'finalizado'
  },
  {
    id: 1007,
    codigoEquipo1: 'mx',
    nombreEquipo1: 'México',
    codigoEquipo2: 'ec',
    nombreEquipo2: 'Ecuador',
    fecha: '2026-06-30T22:00',
    sectores: [
      { nombre: 'Sector VIP', precio: 5000 },
      { nombre: 'Sector Platea', precio: 5000 },
      { nombre: 'Sector General', precio: 5000 },
      { nombre: 'Sector Popular', precio: 5000 }
    ],
    estado: 'proximo'
  },
  {
    id: 1008,
    codigoEquipo1: 'gb-eng',
    nombreEquipo1: 'Inglaterra',
    codigoEquipo2: 'cd',
    nombreEquipo2: 'RD Congo',
    fecha: '2026-07-01T13:00',
    sectores: [
      { nombre: 'Sector VIP', precio: 5000 },
      { nombre: 'Sector Platea', precio: 5000 },
      { nombre: 'Sector General', precio: 5000 },
      { nombre: 'Sector Popular', precio: 5000 }
    ],
    estado: 'proximo'
  },
  {
    id: 1009,
    codigoEquipo1: 'be',
    nombreEquipo1: 'Bélgica',
    codigoEquipo2: 'sn',
    nombreEquipo2: 'Senegal',
    fecha: '2026-07-01T17:00',
    sectores: [
      { font: 'Sector VIP', nombre: 'Sector VIP', precio: 5000 },
      { nombre: 'Sector Platea', precio: 5000 },
      { nombre: 'Sector General', precio: 5000 },
      { nombre: 'Sector Popular', precio: 5000 }
    ],
    estado: 'proximo'
  },
  {
    id: 1010,
    codigoEquipo1: 'us',
    nombreEquipo1: 'Estados Unidos',
    codigoEquipo2: 'ba',
    nombreEquipo2: 'Bosnia y Herzegovina',
    fecha: '2026-07-01T21:00',
    sectores: [
      { nombre: 'Sector VIP', precio: 5000 },
      { nombre: 'Sector Platea', precio: 5000 },
      { nombre: 'Sector General', precio: 5000 },
      { nombre: 'Sector Popular', precio: 5000 }
    ],
    estado: 'proximo'
  },
  {
    id: 1011,
    codigoEquipo1: 'es',
    nombreEquipo1: 'España',
    codigoEquipo2: 'at',
    nombreEquipo2: 'Austria',
    fecha: '2026-07-02T16:00',
    sectores: [
      { nombre: 'Sector VIP', precio: 5000 },
      { nombre: 'Sector Platea', precio: 5000 },
      { nombre: 'Sector General', precio: 5000 },
      { nombre: 'Sector Popular', precio: 5000 }
    ],
    estado: 'proximo'
  },
  {
    id: 1012,
    codigoEquipo1: 'pt',
    nombreEquipo1: 'Portugal',
    codigoEquipo2: 'hr',
    nombreEquipo2: 'Croacia',
    fecha: '2026-07-02T20:00',
    sectores: [
      { nombre: 'Sector VIP', precio: 5000 },
      { nombre: 'Sector Platea', precio: 5000 },
      { nombre: 'Sector General', precio: 5000 },
      { nombre: 'Sector Popular', precio: 5000 }
    ],
    estado: 'proximo'
  },
  {
    id: 1013,
    codigoEquipo1: 'ch',
    nombreEquipo1: 'Suiza',
    codigoEquipo2: 'dz',
    nombreEquipo2: 'Argelia',
    fecha: '2026-07-03T00:00',
    sectores: [
      { nombre: 'Sector VIP', precio: 5000 },
      { nombre: 'Sector Platea', precio: 5000 },
      { nombre: 'Sector General', precio: 5000 },
      { nombre: 'Sector Popular', precio: 5000 }
    ],
    estado: 'proximo'
  },
  {
    id: 1014,
    codigoEquipo1: 'au',
    nombreEquipo1: 'Australia',
    codigoEquipo2: 'eg',
    nombreEquipo2: 'Egipto',
    fecha: '2026-07-03T15:00',
    sectores: [
      { nombre: 'Sector VIP', precio: 5000 },
      { nombre: 'Sector Platea', precio: 5000 },
      { nombre: 'Sector General', precio: 5000 },
      { nombre: 'Sector Popular', precio: 5000 }
    ],
    estado: 'proximo'
  },
  {
    id: 1015,
    codigoEquipo1: 'ar',
    nombreEquipo1: 'Argentina',
    codigoEquipo2: 'cv',
    nombreEquipo2: 'Cabo Verde',
    fecha: '2026-07-03T19:00',
    sectores: [
      { nombre: 'Sector VIP', precio: 5000 },
      { nombre: 'Sector Platea', precio: 5000 },
      { nombre: 'Sector General', precio: 5000 },
      { nombre: 'Sector Popular', precio: 5000 }
    ],
    estado: 'proximo'
  },
  {
    id: 1016,
    codigoEquipo1: 'co',
    nombreEquipo1: 'Colombia',
    codigoEquipo2: 'gh',
    nombreEquipo2: 'Ghana',
    fecha: '2026-07-03T22:30',
    sectores: [
      { nombre: 'Sector VIP', precio: 5000 },
      { nombre: 'Sector Platea', precio: 5000 },
      { nombre: 'Sector General', precio: 5000 },
      { nombre: 'Sector Popular', precio: 5000 }
    ],
    estado: 'proximo'
  }
];

// Calcula el estado real de un partido basándose en su fecha actual y si fue cancelado manualmente.
export function obtenerEstadoReal(partido) {
  if (partido.estado === 'cancelado') {
    return 'cancelado';
  }

  const ahora = new Date();
  const fechaPartido = new Date(partido.fecha);

  if (fechaPartido < ahora) {
    return 'finalizado';
  }

  const est = partido.estado || 'proximo';
  return est === 'nuevo' ? 'proximo' : est;
}

// Simula la cantidad de entradas vendidas por sector para renderizar gráficos de auditoría.
export function obtenerSimulacionVentasSector(nombreSector) {
  const semillas = {
    'sector vip': 85,
    'sector platea': 120,
    'sector general': 240,
    'sector popular': 310
  };
  const clave = nombreSector.toLowerCase().trim();
  return semillas[clave] || 150;
}

// Subcomponente de React para mostrar el badge con colores estilizados según el estado
export function BadgeEstado({ estado }) {
  if (estado === 'proximo') {
    return (
      <span className="badge bg-success-subtle text-success border border-success-subtle">
        ● Próximo
      </span>
    );
  }
  if (estado === 'reprogramado') {
    return (
      <span className="badge bg-warning-subtle text-warning border border-warning-subtle">
        ● Reprogramado
      </span>
    );
  }
  if (estado === 'cancelado') {
    return (
      <span className="badge bg-danger-subtle text-danger border border-danger-subtle">
        ● Cancelado
      </span>
    );
  }
  if (estado === 'finalizado') {
    return (
      <span className="badge bg-secondary-subtle text-secondary border border-secondary-subtle">
        ● Finalizado
      </span>
    );
  }
  return (
    <span className="badge bg-light text-dark border">
      ● {estado}
    </span>
  );
}
