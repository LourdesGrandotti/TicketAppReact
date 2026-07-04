// Portado directo del <footer> repetido en cada .html original (ver home.html línea ~593).
function Footer() {
  return (
    <footer className="ta-footer mt-auto" role="contentinfo">
      <img
        src="/assets/img/logoticketappblanco.png"
        alt="TicketApp"
        className="ta-footer-logo width-contain"
      />
      <div className="ta-footer-copy text-white mx-auto text-center small">
        &copy; 2026 Todos los derechos reservados.
      </div>
      <div className="width120 d-none d-md-block"></div>
    </footer>
  );
}

export default Footer;
