import React from "react";
import "./Navbar.css";
import { observer } from "mobx-react-lite";
import { userStore } from "./customer/userStore";
import { partnerStore } from "./partner/partnerStore";
import { toJS } from "mobx";
import { useHistory } from "react-router-dom";

const Navbar = observer(() => {
  const history = useHistory();
  console.log(toJS(userStore.user));
  console.log(toJS(partnerStore.username));

  return (
    <div className="navbar bg-base-100 pr-10">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl" href="/">
          cubeQue
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          {(!userStore.username && !partnerStore.username) &&(
            <li>
              <a href="/login">Log in</a>
            </li>
          )}
          <li>
            <a href="/register">Sign up</a>
          </li>
          <li tabIndex="0">
            <a>
              Be our partner
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </a>
            <ul className="p-2 bg-base-100">
              <li>
                <a href="/partner">Partner with us</a>
              </li>
              {(!userStore.username && !partnerStore.username)&& (
                <li>
                  <a href="/partnerlogin">Log in</a>
                </li>
              )}
               {partnerStore.username && (
                <li>
                 {partnerStore.username}
                </li>
              )}
              {partnerStore.username && (
                <li>
                  <button
                    className="btn btn-active btn-ghost"
                    onClick={() => {
                      partnerStore.logout();
                      history.push("/");
                    }}
                  >
                    Log Out
                  </button>
                </li>
              )}
            </ul>
          </li>
          {userStore.username && (
            <li tabIndex="0">
              <a>
                {userStore.username}
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>

              <ul className="p-2 bg-base-100">
                <li>
                  <button
                    className="btn btn-active btn-ghost"
                    onClick={() => userStore.logout()}
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
    {!userStore.username && (
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
