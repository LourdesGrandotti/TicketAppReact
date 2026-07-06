import { useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import partidos from "../data/partidos.js";
import { STADIUM_SECTIONS, getSectorCategory } from "../data/stadiumData.js";

// Función solicitada por el usuario
export function obtenerSimulacionVentasSector(nombreSector) {
  const semillas = {
    "sector vip": 85,
    "sector platea": 120,
    "sector general": 240,
    "sector popular": 310,
  };
  const clave = nombreSector.toLowerCase().trim();
  return semillas[clave] || 150;
}

// Mapeo de categorías para la función de simulación
const CATEGORY_NAMES = {
  palco: "sector vip",
  platea: "sector platea",
  norte: "sector popular",
  sur: "sector popular",
};

function Estadio() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const idPartido = searchParams.get("partido");
  const partido = partidos.find((p) => String(p.id) === String(idPartido));

  const [sectorElegido, setSectorElegido] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [zoomScale, setZoomScale] = useState(1);

  if (!partido) {
    return (
      <div className="ta-container text-center py-5">
        <h1 className="ta-section-title">Partido no encontrado</h1>
        <button
          onClick={() => navigate("/partidos")}
          className="btn btn-brand rounded-pill fw-bold px-4 py-2"
        >
          Ver todos los partidos
        </button>
      </div>
    );
  }

  const { local, visitante, date, time, estadio, ciudad, home, away } = partido;

  const handleSelectSector = (sid) => {
    setSectorElegido(sid);
    setCantidad(1);
  };

  const handleZoomIn = () => setZoomScale((z) => Math.min(z + 0.15, 1.8));
  const handleZoomOut = () => setZoomScale((z) => Math.max(z - 0.15, 0.7));

  const handleContinuar = () => {
    if (cantidad === 0) return;
    const params = new URLSearchParams();
    params.set("sector", sectorElegido);
    if (idPartido) params.set("partido", idPartido);
    params.set("cant", cantidad);
    navigate(`/asientos?${params.toString()}`);
  };

  const getPrecio = (cat) => {
    if (cat === "palco") return 500000;
    if (cat === "platea") return 300000;
    return 250000; // norte y sur
  };

  // Render SVG del Estadio
  const renderEstadioMap = () => {
    return (
      <div className="ta-map-wrapper position-relative" style={{ minHeight: "400px" }}>
        <div className="ta-zoom-panel position-absolute top-0 start-0 m-3 d-flex flex-column gap-2" style={{ zIndex: 10 }}>
          <button className="btn btn-danger btn-sm text-white rounded-1" onClick={handleZoomIn}>
            <i className="bi bi-plus-lg">+</i>
          </button>
          <button className="btn btn-light btn-sm text-dark border rounded-1" onClick={handleZoomOut}>
            <i className="bi bi-dash-lg">-</i>
          </button>
        </div>

        <svg
          id="stadium-map"
          viewBox="0 0 580 490"
          width="100%"
          style={{ transform: `scale(${zoomScale})`, transition: "transform 0.2s ease", transformOrigin: "center center" }}
        >
          {/* Campo de juego */}
          <rect x="220" y="195" width="140" height="100" rx="4" fill="#28a745" />
          <line x1="290" y1="195" x2="290" y2="295" stroke="white" strokeWidth="1.8" />
          <circle cx="290" cy="245" r="20" fill="none" stroke="white" strokeWidth="1.8" />
          <rect x="220" y="220" width="25" height="50" fill="none" stroke="white" strokeWidth="1.8" />
          <rect x="335" y="220" width="25" height="50" fill="none" stroke="white" strokeWidth="1.8" />
          <circle cx="242" cy="245" r="2.2" fill="white" />
          <circle cx="338" cy="245" r="2.2" fill="white" />
          <circle cx="290" cy="245" r="2.2" fill="white" />

          {/* Sectores */}
          {STADIUM_SECTIONS.map((sec) => {
            const isSelected = sectorElegido === sec.id;
            const scale = isSelected ? 1.08 : 1.0;
            const transform = `translate(${sec.cx},${sec.cy}) rotate(${sec.angle}) scale(${scale})`;
            return (
              <g
                key={sec.id}
                className={`st-sec ${isSelected ? "sel" : ""}`}
                data-sid={sec.id}
                data-avail={sec.avail}
                transform={transform}
                onClick={() => handleSelectSector(sec.id)}
                style={{ cursor: "pointer" }}
              >
                <rect x={-sec.w / 2} y={-sec.h / 2} width={sec.w} height={sec.h} rx="3" />
                <text x="0" y="3" textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight="600" fontSize="6.8">
                  {sec.id}
                </text>
              </g>
            );
          })}

          <text x="290" y="22" textAnchor="middle" fontFamily="Montserrat, sans-serif" fontSize="10" fontWeight="600" fill="#666" letterSpacing="1.5">
            SECTOR NORTE
          </text>
          <text x="290" y="478" textAnchor="middle" fontFamily="Montserrat, sans-serif" fontSize="10" fontWeight="600" fill="#666" letterSpacing="1.5">
            SECTOR SUR
          </text>
        </svg>

        <div className="ta-legend mt-4 d-flex justify-content-center gap-4">
          <div className="ta-legend-item d-flex align-items-center gap-2">
            <span className="ta-leg-box unavailable-box border" style={{ width: 22, height: 22, backgroundColor: "#e9ecef", borderRadius: 4, borderColor: "#dee2e6" }}></span>
            <span className="small" style={{ color: "#333" }}>No disponible</span>
          </div>
          <div className="ta-legend-item d-flex align-items-center gap-2">
            <span className="ta-leg-box available-box" style={{ width: 22, height: 22, backgroundColor: "#dbeafe", borderRadius: 4, border: "1px solid #3b82f6" }}></span>
            <span className="small" style={{ color: "#333" }}>Disponible</span>
          </div>
          <div className="ta-legend-item d-flex align-items-center gap-2">
            <span className="ta-leg-box selected-box" style={{ width: 22, height: 22, backgroundColor: "#ed194d", borderRadius: 4, border: "1px solid #c9103d" }}></span>
            <span className="small" style={{ color: "#333" }}>Asiento seleccionado</span>
          </div>
        </div>
      </div>
    );
  };

  const renderPanelDetails = () => {
    if (!sectorElegido) return null;

    const cat = getSectorCategory(sectorElegido);
    const precio = getPrecio(cat);
    
    // Capitalize category name for display
    const catName = cat.charAt(0).toUpperCase() + cat.slice(1);

    return (
      <div className="ta-panel-col w-100 ps-4">
        <div className="ta-table-hdr d-flex text-secondary fw-bold mb-3 border-bottom pb-3">
          <div style={{ width: "40%" }}>Sector</div>
          <div className="text-center" style={{ width: "30%" }}>Cantidad</div>
          <div className="text-end pe-4" style={{ width: "30%" }}>Precio</div>
        </div>

        <div id="rows-container">
          <div className="ta-row-item d-flex align-items-center p-3 rounded" style={{ border: "2px solid #ed194d", backgroundColor: "#fff" }}>
            <div className="tr-sector fw-bold" style={{ width: "40%", color: "#333" }}>
              {sectorElegido} ({catName})
            </div>
            
            <div className="tr-qty text-center" style={{ width: "30%" }}>
              <select
                className="ta-qty-sel border rounded px-3 py-1"
                value={cantidad}
                onChange={(e) => setCantidad(parseInt(e.target.value))}
                style={{ backgroundColor: "#fff", outline: "none" }}
              >
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            
            <div className="tr-price text-end fw-bold d-flex align-items-center justify-content-end gap-3" style={{ width: "30%", color: "#333" }}>
              ${precio.toLocaleString("es-AR")}
              <i className="bi bi-cart-fill fs-5" style={{ color: "#ed194d" }}></i>
            </div>
          </div>
        </div>

        <div className="text-center mt-5">
          <button
            className="btn btn-brand rounded-pill w-100 py-3 fw-bold fs-5 text-white"
            style={{ backgroundColor: "#ed194d", border: "none" }}
            disabled={cantidad === 0}
            onClick={handleContinuar}
          >
            Continuar
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Barra de info superior según mockup */}
      <div className="ta-match-bar" style={{ backgroundColor: "#ed194d", padding: "14px 40px" }}>
        <div className="ta-bar-inner d-flex align-items-center gap-4 text-white">
          <div className="d-flex align-items-center gap-3">
            {home?.flag ? (
              <img src={`https://flagcdn.com/w40/${home.flag}.png`} alt={local} className="rounded" style={{ width: 44, height: 28, objectFit: "cover" }} />
            ) : (
              <div className="ta-flag-placeholder bg-secondary text-white rounded d-flex align-items-center justify-content-center" style={{ width: 44, height: 28 }}>
                {local.slice(0, 2).toUpperCase()}
              </div>
            )}
            <span className="fw-bold">VS</span>
            {away?.flag ? (
              <img src={`https://flagcdn.com/w40/${away.flag}.png`} alt={visitante} className="rounded" style={{ width: 44, height: 28, objectFit: "cover" }} />
            ) : (
              <div className="ta-flag-placeholder bg-secondary text-white rounded d-flex align-items-center justify-content-center" style={{ width: 44, height: 28 }}>
                {visitante.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>
          
          <div style={{ borderLeft: "1px solid rgba(255,255,255,0.3)", height: "40px" }}></div>
          
          <div className="d-flex flex-column" style={{ fontSize: "0.85rem" }}>
            <div className="fw-bold">{date} | {time}</div>
            <div>{estadio}</div>
            <div className="opacity-75">{ciudad}</div>
          </div>
        </div>
      </div>

      <main className="ta-container py-5 px-4 mx-auto" style={{ maxWidth: "1200px" }}>
        <div className="mb-4">
          <button 
            className="btn btn-brand rounded-pill px-4 fw-bold text-white" 
            style={{ backgroundColor: "#ed194d", border: "none" }}
            onClick={() => navigate("/partidos")}
          >
            <span style={{ marginRight: "8px", fontWeight: "bold" }}>&lt;</span> Volver
          </button>
        </div>
        <div className="row">
          <div className="col-lg-7">
            {renderEstadioMap()}
          </div>
          <div className="col-lg-5">
            {renderPanelDetails()}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Estadio;
