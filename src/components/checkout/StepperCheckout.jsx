// Portado de renderizarStepper() en cart.js.
const PASOS = [
  { num: 1, label: "Resumen", key: "resumen" },
  { num: 2, label: "Pago", key: "pago" },
  { num: 3, label: "Confirmación", key: "exito" },
];

export default function StepperCheckout({ pasoActivo }) {
  const activo = PASOS.find((p) => p.key === pasoActivo)?.num || 1;
  const pct = ((activo - 1) / 2) * 100;

  return (
    <div className="stepper-container">
      <div className="stepper-line" />
      <div className="stepper-line-progress" style={{ width: `${pct}%` }} />
      {PASOS.map((p) => (
        <div
          key={p.key}
          className={
            "stepper-step" +
            (p.num === activo ? " active" : p.num < activo ? " completed" : "")
          }
        >
          <div className="stepper-circle">
            {p.num}
          </div>
          <div className="stepper-label">{p.label}</div>
        </div>
      ))}
    </div>
  );
}