// src/components/MatchCard.jsx
import { Link } from "react-router-dom";

function MatchCard({ partido, logueado }) {
    const destino = logueado ? `/estadio?partido=${partido.id}` : "/login";

    return (
        <div className="card border-brand rounded-3 flex-shrink-0 col-11 col-md-7 col-lg-5 col-xl-4 p-0 shadow-sm">
            <div className="row g-0 h-100">
                <div className="col-9 col-sm-10 p-4 bg-white rounded-start-3">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <span className="badge bg-brand-light rounded-pill px-3 py-2 border-0">Dieciseisavos de final</span>
                        <span className="small fw-bold text-muted">{partido.date}</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center text-center mb-4 px-2">
                        <div className="col-4 d-flex flex-column align-items-center">
                            <div className="col-8 col-sm-6 mb-2">
                                <div className="ratio ratio-1x1">
                                    <div className="rounded-circle border border-secondary bg-light overflow-hidden">
                                        <span className={`fi fi-${partido.home.flag} fis w-100 h-100 d-block`}></span>
                                    </div>
                                </div>
                            </div>
                            <span className="small fw-bold text-center lh-sm text-wrap text-uppercase">{partido.home.name}</span>
                        </div>

                        <span className="fw-bold fs-5 text-muted col-2">VS</span>

                        <div className="col-4 d-flex flex-column align-items-center">
                            <div className="col-8 col-sm-6 mb-2">
                                <div className="ratio ratio-1x1">
                                    <div className="rounded-circle border border-secondary bg-light overflow-hidden">
                                        <span className={`fi fi-${partido.away.flag} fis w-100 h-100 d-block`}></span>
                                    </div>
                                </div>
                            </div>
                            <span className="small fw-bold text-center lh-sm text-wrap text-uppercase">{partido.away.name}</span>
                        </div>
                    </div>

                    <div>
                        <div className="small text-muted d-flex align-items-center gap-2 mb-2">
                            <i className="bx bx-time fs-5"></i> {partido.time}
                        </div>
                        <div className="small text-muted d-flex align-items-center gap-2">
                            <i className="bx bx-map fs-5"></i> {partido.stadium}
                        </div>
                        <div className="small fw-bold text-brand d-flex align-items-center gap-2 mt-1">
                            <i className="bx bx-purchase-tag fs-5 invisible"></i> {partido.price}
                        </div>
                    </div>
                </div>

                <Link
                    to={destino}
                    className="col-3 col-sm-2 border-start border-2 border-light-subtle d-flex flex-column align-items-center justify-content-center bg-light rounded-end-3 py-4 text-decoration-none text-brand hover-opacity"
                >
                    <i className="bx bx-receipt fs-4 mb-3"></i>
                    <div className="d-flex flex-column align-items-center fw-bold small lh-1 gap-1">
                        {"TICKET".split("").map((letra, i) => <span key={i}>{letra}</span>)}
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default MatchCard;