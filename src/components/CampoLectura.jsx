function CampoLectura({ label, valor }) {
  return (
    <div className="mb-3 row">
      <label className="col-sm-2 col-form-label">{label}</label>
      <div className="col-sm-10">
        <input
          type="text"
          readOnly
          className="form-control-plaintext"
          value={valor}
        />
      </div>
    </div>
  );
}

export default CampoLectura;
