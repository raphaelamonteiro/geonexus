import "../index.css";

export function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid">

          {/* Logo */}
          <a className="navbar-title" href="/">
            GeoNexus
          </a>

          {/* Botão Hamburguer */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Conteúdo do Menu */}
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Início
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Continentes
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/countries">
                  Países
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Cidades
                </a>
              </li>
            </ul>

            {/* Barra de busca */}
            <form role="search">
              <input
                className="form-control"
                type="search"
                placeholder="Buscar País"
                aria-label="Buscar País"
              />
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
}
