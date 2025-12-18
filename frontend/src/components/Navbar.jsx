import { Link, NavLink } from "react-router-dom";
import { IconList, IconMoon, IconPlus, IconSun } from "./icons";
import { useTheme } from "./theme";

function Pill({ to, end, icon, children }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => `pill ${isActive ? "pillActive" : ""}`}
      style={{ textDecoration: "none" }}
    >
      {icon}
      <span style={{ fontSize: 13, fontWeight: 700 }}>{children}</span>
    </NavLink>
  );
}

export default function Navbar() {
  const { theme, toggle } = useTheme();
  return (
    <div className="nav">
      <div className="navInner">
        <Link to="/" className="brand" aria-label="DevOps CRUD Home">
          <div className="logo" />
          <div className="brandTitle">
            <strong>DevOps</strong>
          </div>
        </Link>

        <div className="navLinks">
          <Pill to="/" end icon={<IconList />}>
            Items
          </Pill>
          <Pill to="/new" icon={<IconPlus />}>
            Crear
          </Pill>

          <button className="btn" onClick={toggle} title="Cambiar tema">
            {theme === "dark" ? <IconSun /> : <IconMoon />}
            <span style={{ fontSize: 13, fontWeight: 700 }}>
              {theme === "dark" ? "Light" : "Dark"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
