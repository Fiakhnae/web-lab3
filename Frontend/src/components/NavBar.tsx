import { Outlet, Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"></script>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container">
          <a className="navbar-brand">BusyBird</a>
          <button className="navbar-toggler" type="button">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Профіль
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  Про додаток
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Робоча сторінка додатка
                </Link>
              </li>
              <div className="ms-auto">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Вхід
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Реєстрація
                    </Link>
                  </li>
                </ul>
              </div>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default NavBar;
