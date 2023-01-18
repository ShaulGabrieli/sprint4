import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import routes from "../routes";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { login, logout, signup } from "../store/user.actions.js";
import { LoginSignup } from "./login-signup.jsx";

export function AppHeader() {
  const user = useSelector((storeState) => storeState.userModule.user);

  async function onLogin(credentials) {
    try {
      const user = await login(credentials);
      showSuccessMsg(`Welcome: ${user.fullname}`);
    } catch (err) {
      showErrorMsg("Cannot login");
    }
  }
  async function onSignup(credentials) {
    try {
      const user = await signup(credentials);
      showSuccessMsg(`Welcome new user: ${user.fullname}`);
    } catch (err) {
      showErrorMsg("Cannot signup");
    }
  }
  async function onLogout() {
    try {
      await logout();
      showSuccessMsg(`Bye now`);
    } catch (err) {
      showErrorMsg("Cannot logout");
    }
  }

  return (
    <header className="app-header main-layout full flex align-center sticky">
      <nav className="flex">
        <h1 className="header-logo">Fiverr</h1>
        <input
          type="text"
          className="search-box"
          placeholder="What service are you looking for today?"
        ></input>
        <div className="search-icon-box">
          <span class="material-symbols-outlined search-icon">search</span>
        </div>
        <span class="material-symbols-outlined">notifications</span>
        <span class="material-symbols-outlined">mail</span>
        <span class="material-symbols-outlined">favorite</span>
        <span>Orders</span>
        <span class="material-symbols-outlined">account_circle</span>
        {routes.map((route) => (
          <NavLink key={route.path} to={route.path}>
            {route.label}
          </NavLink>
        ))}

        {user && (
          <span className="user-info">
            <Link to={`user/${user._id}`}>
              {user.imgUrl && <img src={user.imgUrl} />}
              {user.fullname}
            </Link>
            <span className="score">{user.score?.toLocaleString()}</span>
            <button onClick={onLogout}>Logout</button>
          </span>
        )}
        {!user && (
          <section className="user-info">
            <LoginSignup onLogin={onLogin} onSignup={onSignup} />
          </section>
        )}
      </nav>
      <hr />
    </header>
  );
}
