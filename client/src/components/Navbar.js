import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { store } from "./Store";
import { toJS } from "mobx";

const Navbar = observer(() => {
  console.log(toJS(store.user));

  return (
    <div className="navbar bg-base-100 pr-10">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl" href="/">
          cubeQue
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          {!store.username && (
            <li>
              <a href="/login">Log in</a>
            </li>
          )}
          <li>
            <a href="/register">Sign up</a>
          </li>
          <li tabindex="0">
            <a>
              Be our partner
              <svg
                class="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </a>
            <ul class="p-2 bg-base-100">
              <li>
                <a href="/partner">Partner with us</a>
              </li>
              <li>
                <a>Log in</a>
              </li>
            </ul>
          </li>
          {store.username && (
            <li tabindex="0">
              <a>
                {store.username}
                <svg
                  class="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>

              <ul class="p-2 bg-base-100">
                <li>
                  <button
                    className="btn btn-active btn-ghost"
                    onClick={() => store.logout()}
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
});
export default Navbar;

{
  /* <nav>
<ul className="menu">
  <li className="logo">
    <Link to="/">cubeQue</Link>
  </li>
  <ul className="submenu">
    {!store.username && (
      <li className="item button ">
        <Link to="/login">Log in</Link>
      </li>
    )}
    <li className="item button">
      <Link to="/register">Sign up</Link>
    </li>
    <li className="item button secondary">
      <Link to="/partner">Be our partner</Link>
    </li>
    {store.username && (
      <li className="item button ">
        <button onClick={() => store.logout()}>Log Out</button>
      </li>
    )}
    {store.username && (
      <li className="item button " style={{ color: "white" }}>
        
      </li>
    )}
  </ul>
</ul> 
</nav>*/
}
