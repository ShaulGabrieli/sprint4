import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import routes from "../routes";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";

import { login, logout, signup } from "../store/user.actions.js";
import { LoginSignup } from "./login-signup.jsx";
import { GigFilter } from "./gig-filter.jsx";
import { AppHero } from "./app-hero.jsx";
import { PopupMenu } from "./popup-menu";
import { useEffect, useState } from "react";
import { GigOrderList } from "./gig-order-list.jsx";
import { setFilter } from "../store/gig.actions.js";
import { useEffect, useState } from "react";
import { gigService } from "../services/gig.service.local";

export function AppHeader() {
  const user = useSelector((storeState) => storeState.userModule.user);
  const [filterByToEdit, setFilterByToEdit] = useState(gigService.getDefaultFilter());



  useEffect(() => {
    // update father cmp that filters change very type
    setFilter(filterByToEdit)
}, [filterByToEdit])
  const [openOrders, setOpenOrders] = useState(false);
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

  function handleChange({ target }) {
    let { value, name: field, type } = target;
    setFilterByToEdit((prevFilter) => {
      return { ...prevFilter, [field]: value };
    });
  }

  return (
    <header className="app-header main-container full sticky">
      {/* <AppHero /> */}

      <div className="flex space-between align-center">
        <Link className="header-logo" to={`/`}>
          <svg
            width="89"
            height="27"
            viewBox="0 0 89 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="#404145">
              <path d="m81.6 13.1h-3.1c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-13.4h-2.5c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-18.4h6v2.8c1-2.2 2.3-2.8 4.3-2.8h7.3v2.8c1-2.2 2.3-2.8 4.3-2.8h2zm-25.2 5.6h-12.4c.3 2.1 1.6 3.2 3.7 3.2 1.6 0 2.7-.7 3.1-1.8l5.3 1.5c-1.3 3.2-4.5 5.1-8.4 5.1-6.5 0-9.5-5.1-9.5-9.5 0-4.3 2.6-9.4 9.1-9.4 6.9 0 9.2 5.2 9.2 9.1 0 .9 0 1.4-.1 1.8zm-5.7-3.5c-.1-1.6-1.3-3-3.3-3-1.9 0-3 .8-3.4 3zm-22.9 11.3h5.2l6.6-18.3h-6l-3.2 10.7-3.2-10.8h-6zm-24.4 0h5.9v-13.4h5.7v13.4h5.9v-18.4h-11.6v-1.1c0-1.2.9-2 2.2-2h3.5v-5h-4.4c-4.3 0-7.2 2.7-7.2 6.6v1.5h-3.4v5h3.4z"></path>
            </g>
            <g fill="#1dbf73">
              <path d="m85.3 27c2 0 3.7-1.7 3.7-3.7s-1.7-3.7-3.7-3.7-3.7 1.7-3.7 3.7 1.7 3.7 3.7 3.7z"></path>
            </g>
          </svg>
        </Link>
        <div className="flex align-center search-container">
          <label htmlFor="gigTitle"></label>
          <input
            className="search-box"
            type="text"
            id="gigTitle"
            name="title"
            placeholder="What service are you looking for today?"
            value={filterByToEdit.title}
          onChange={handleChange}
          />
          <div className="search-icon-box">
            <span className="material-symbols-outlined search-icon">
              search
            </span>
          </div>
        </div>{" "}
        <p>Fiverr Buisness</p>
        {/* <GigFilter /> */}
        {/* <div className="user-nav flex align-center"> */}
        <a href="">
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.5 20.167h5M4.295 11.87l-1.562 1.563a3.07 3.07 0 00-.9 2.171v0c0 .678.55 1.228 1.229 1.228h15.877c.678 0 1.228-.55 1.228-1.228v0a3.07 3.07 0 00-.9-2.171l-1.562-1.563a2.975 2.975 0 01-.872-2.104v-2.1A5.833 5.833 0 0011 1.833v0a5.833 5.833 0 00-5.833 5.834v2.1c0 .79-.314 1.546-.872 2.104z"
              stroke="#74767e"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
        <a href="">
          <svg
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M.833 9.834v5A1.667 1.667 0 002.5 16.5h15a1.666 1.666 0 001.667-1.666v-5"
              stroke="#74767e"
              stroke-width="2"
              stroke-miterlimit="10"
              stroke-linecap="square"
            />
            <path
              d="M19.167 5.667v-2.5A1.667 1.667 0 0017.5 1.5h-15A1.667 1.667 0 00.833 3.167v2.5l9.167 5 9.167-5z"
              stroke="#74767e"
              stroke-width="2"
              stroke-miterlimit="10"
              stroke-linecap="square"
            />
          </svg>
        </a>
        <a href="">
          <span className="material-symbols-outlined">favorite</span>{" "}
        </a>
        {/* <span class="material-symbols-outlined">
notifications
</span>
<span class="material-symbols-outlined">
mail
</span> */}
        {/* </div> */}
        {/* <div className="flex align-center"> */}
        <a onClick={()=> {setOpenOrders(!openOrders)}}>
          <span>Orders</span>
          {
            openOrders && <PopupMenu > <GigOrderList /> </PopupMenu>
          }
        </a>
        {/* <a>
          <span class="material-symbols-outlined">account_circle</span>{" "}
        </a> */}
        <a className="user-info">
          <Link to={`user/${user._id}`}>
            {user.imgUrl && <img src={user.imgUrl} />}
          </Link>
        </a>
        {/* </div> */}
        {/* {user && (
            <span className="user-info">
              <Link to={`user/${user._id}`}>
                {user.imgUrl && <img src={user.imgUrl} />}
                {user.fullname}
              </Link>
              <span className="score">{user.score?.toLocaleString()}</span>
              <button onClick={onLogout}>Logout</button>
            </span>
          )} */}
      </div>

      {/* {!user && (
          <section className="user-info">
            <LoginSignup onLogin={onLogin} onSignup={onSignup} />
          </section>
        )} */}

      <hr className="full" />
      <nav className="main-nav">
        <ul className="clean list flex space-between jusitfy-center ">
          <li>
            <a href="/">Graphics & Design</a>
          </li>
          <li>
            <a href="">Digital Marketing</a>
          </li>
          <li>
            <a href="">Writing & Translation</a>
          </li>
          <li>
            <a href="">Video & Animation</a>
          </li>
          <li>
            <a href="">Music & Audio</a>
          </li>
          <li>
            <a href="">Programming & Tech</a>
          </li>
          <li>
            <a href="">Business</a>
          </li>
          <li>
            <a href="">Lifestyle</a>
          </li>
          <li>
            <a href="">Trending</a>
          </li>
        </ul>
        <hr className="full " />
      </nav>
    </header>
  );
}
//
