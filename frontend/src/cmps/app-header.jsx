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

<<<<<<< HEAD
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
=======
    return (
        <header className='app-header'>
            <nav className='flex'>
                <h1 className='header-logo'>Logo</h1>
                <input type='text' className='search-box' placeholder='What service are you looking for today?'></input>
                <div className='search-icon-box'>
                    <span class='material-symbols-outlined search-icon'>search</span>
                </div>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 20.167h5M4.295 11.87l-1.562 1.563a3.07 3.07 0 00-.9 2.171v0c0 .678.55 1.228 1.229 1.228h15.877c.678 0 1.228-.55 1.228-1.228v0a3.07 3.07 0 00-.9-2.171l-1.562-1.563a2.975 2.975 0 01-.872-2.104v-2.1A5.833 5.833 0 0011 1.833v0a5.833 5.833 0 00-5.833 5.834v2.1c0 .79-.314 1.546-.872 2.104z" stroke="#74767e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M.833 9.834v5A1.667 1.667 0 002.5 16.5h15a1.666 1.666 0 001.667-1.666v-5" stroke="#74767e" stroke-width="2" stroke-miterlimit="10" stroke-linecap="square"/><path d="M19.167 5.667v-2.5A1.667 1.667 0 0017.5 1.5h-15A1.667 1.667 0 00.833 3.167v2.5l9.167 5 9.167-5z" stroke="#74767e" stroke-width="2" stroke-miterlimit="10" stroke-linecap="square"/></svg>
                {/* <span class="material-symbols-outlined">
notifications
</span>
<span class="material-symbols-outlined">
mail
</span> */}
<span class="material-symbols-outlined">
favorite
</span>
<span>Orders</span>
<span class="material-symbols-outlined">
account_circle
</span>
                {routes.map((route) => (
                    <NavLink key={route.path} to={route.path}>
                        {route.label}
                    </NavLink>
                ))}
>>>>>>> 2f5e1c5537bc69e1d82abdf7a882bcb4834f0ef8

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
