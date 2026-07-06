// Calcula coordenadas de elipse
const getEllipseCoord = (theta_deg, rx, ry) => {
  const theta = (theta_deg * Math.PI) / 180;
  const x = rx * Math.cos(theta);
  const y = ry * Math.sin(theta);
  const angle_rad = Math.atan2(rx * Math.sin(theta), ry * Math.cos(theta));
  const angle_deg = (angle_rad * 180) / Math.PI;
  return { x, y, angle: angle_deg };
};

export const getSectorCategory = (sid) => {
  if (sid.startsWith("A")) return "palco";
  if (sid.startsWith("D")) return "platea";

  const num = parseInt(sid.substring(1), 10);
  if (sid.startsWith("B")) {
    return num <= 4 ? "norte" : "sur";
  }
  if (sid.startsWith("C")) {
    return num <= 5 ? "norte" : "sur";
  }
  return "norte";
};

// Genera mapa de secciones
export const STADIUM_SECTIONS = (() => {
  const s = [];
  const cx = 290;
  const cy = 245;

  // Anillo interior A
  const rxA = 172;
  const ryA = 132;
  for (let i = 0; i < 30; i++) {
    const theta = -90 + i * 12;
    const p = getEllipseCoord(theta, rxA, ryA);
    s.push({
      id: `A${i + 1}`,
      cx: Math.round(cx + p.x),
      cy: Math.round(cy + p.y),
      w: 24,
      h: 30,
      angle: Math.round(p.angle),
      avail: true,
    });
  }

  // Rectas superiores
  [
    { id: "B1", cx: 231, cy: 65, w: 32, h: 17, angle: 0, avail: true },
    { id: "B2", cx: 268, cy: 65, w: 32, h: 17, angle: 0, avail: true },
    { id: "B3", cx: 305, cy: 65, w: 32, h: 17, angle: 0, avail: true },
    { id: "B4", cx: 342, cy: 65, w: 32, h: 17, angle: 0, avail: true },
    { id: "C1", cx: 214, cy: 40, w: 28, h: 18, angle: 0, avail: true },
    { id: "C2", cx: 247, cy: 40, w: 28, h: 18, angle: 0, avail: true },
    { id: "C3", cx: 280, cy: 40, w: 28, h: 18, angle: 0, avail: true },
    { id: "C4", cx: 313, cy: 40, w: 28, h: 18, angle: 0, avail: true },
    { id: "C5", cx: 346, cy: 40, w: 28, h: 18, angle: 0, avail: true },
  ].forEach((item) => s.push(item));

  // Rectas inferiores
  [
    { id: "B5", cx: 231, cy: 425, w: 32, h: 17, angle: 0, avail: true },
    { id: "B6", cx: 268, cy: 425, w: 32, h: 17, angle: 0, avail: true },
    { id: "B7", cx: 305, cy: 425, w: 32, h: 17, angle: 0, avail: true },
    { id: "B8", cx: 342, cy: 425, w: 32, h: 17, angle: 0, avail: true },
    { id: "C6", cx: 214, cy: 450, w: 28, h: 18, angle: 0, avail: true },
    { id: "C7", cx: 247, cy: 450, w: 28, h: 18, angle: 0, avail: true },
    { id: "C8", cx: 280, cy: 450, w: 28, h: 18, angle: 0, avail: true },
    { id: "C9", cx: 313, cy: 450, w: 28, h: 18, angle: 0, avail: true },
    { id: "C10", cx: 346, cy: 450, w: 28, h: 18, angle: 0, avail: true },
  ].forEach((item) => s.push(item));

  // Curva derecha
  const rxD = 222;
  const ryD = 182;
  for (let j = 0; j < 13; j++) {
    const thetaD = -64 + j * 10.6;
    const pD = getEllipseCoord(thetaD, rxD, ryD);
    s.push({
      id: `D${j + 1}`,
      cx: Math.round(cx + pD.x),
      cy: Math.round(cy + pD.y),
      w: 24,
      h: 30,
      angle: Math.round(pD.angle),
      avail: true,
    });
  }

  // Curva izquierda
  for (let k = 0; k < 13; k++) {
    const thetaL = 116 + k * 10.6;
    const pL = getEllipseCoord(thetaL, rxD, ryD);
    s.push({
      id: `D${26 - k}`,
      cx: Math.round(cx + pL.x),
      cy: Math.round(cy + pL.y),
      w: 24,
      h: 30,
      angle: Math.round(pL.angle),
      avail: true,
    });
  }

  return s;
})();

const PRECIOS_POR_CATEGORIA = {
  palco: 500000,
  platea: 300000,
  norte: 250000,
  sur: 250000,
};

export const getPrecioPorSector = (sid) => {
  const categoria = getSectorCategory(sid);
  return PRECIOS_POR_CATEGORIA[categoria] || 250000;
};