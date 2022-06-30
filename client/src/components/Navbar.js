import React, { Fragment, useState, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { observer } from "mobx-react-lite";
import { userStore } from "./Store/userStore";
import { partnerStore } from "./Store/partnerStore";
import { useParams, useHistory } from "react-router-dom";

const navigation = [
  { name: "เข้าสู่ระบบ", href: "/login", current: false },
  { name: "สมัครสมาชิก", href: "/register", current: false },
  { name: "ต้องการเป็นพาร์ทเนอร์", href: "/register", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = observer(() => {
  const [navbar, setNavbar] = useState(true);
  console.log(userStore.customer);
  const history = useHistory();
  const scrollNav = () => {
    if (window.scrollY > 60) {
      setNavbar(false);
    } else {
      setNavbar(true);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", scrollNav);
    return () => {
      window.removeEventListener("scroll", scrollNav);
    };
  }, []);

  return (
    <Disclosure
      as="nav"
      className={`${
        navbar && "fixed top-0 w-full z-50 bg-white ease-in duration-500"
      }`}
    >
      {({ open }) => (
        <>
          <div className="bg-gray-50 max-w-full  mx-auto px-8 sm:px-10 lg:px-12">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center  p-2 rounded-md text-black hover:text-white hover:bg-gray-100 ">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-4 w-4" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-4 w-4" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-start sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <a
                    className="btn ml-6 btn-ghost normal-case text-2xl"
                    href="/"
                  >
                    cubeQue
                  </a>
                </div>
                <div className="hidden  sm:block sm:ml-6">
                  <div className="flex  space-x-4 pt-2">
                    {navigation.map((item) => (
                      <>
                        {item.name === "เข้าสู่ระบบ" ||
                        item.name === "สมัครสมาชิก" ? (
                          !userStore.customer.username &&
                          !partnerStore.partnerlogin.username && (
                            <a
                              key={item.name}
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? "bg-gray-300 text-black"
                                  : "text-black hover:bg-gray-300 hover:text-white",
                                "px-3 py-2 rounded-md text-sm font-medium"
                              )}
                              aria-current={item.current ? "page" : undefined}
                            >
                              {item.name}
                            </a>
                          )
                        ) : item.name === "ต้องการเป็นพาร์ทเนอร์" ? (
                          <Menu
                            key={item.name}
                            as="div"
                            className="ml-3  relative"
                          >
                            <div>
                              <Menu.Button className=" flex text-lg rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2  ">
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? "bg-gray-300 text-black"
                                      : "text-black hover:bg-gray-300 hover:text-white",
                                    "px-3 py-2 rounded-md text-sm font-medium"
                                  )}
                                  aria-current={
                                    item.current ? "page" : undefined
                                  }
                                >
                                  {item.name}
                                </a>
                              </Menu.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      href="/joinpartner"
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      สมัครเป็นพาร์ทเนอร์
                                    </a>
                                  )}
                                </Menu.Item>
                                {!userStore.customer.username &&
                                  !partnerStore.partnerlogin.username && (
                                    <Menu.Item>
                                      {({ active }) => (
                                        <a
                                          href="/loginpartner"
                                          className={classNames(
                                            active ? "bg-gray-100" : "",
                                            "block px-4 py-2 text-sm text-gray-700"
                                          )}
                                        >
                                          เข้าสู่ระบบ
                                        </a>
                                      )}
                                    </Menu.Item>
                                  )}
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        ) : (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-300 text-black"
                                : "text-black hover:bg-gray-300 hover:text-white",
                              "px-3 py-2 rounded-md text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        )}
                      </>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                {userStore.customer.username && (
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className=" flex py-2 px-4 rounded-md hover:bg-gray-300 text-sm sm:mr-10 lg:mr-16   ">
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block   text-sm text-black"
                            )}
                          >
                            {userStore.customer.username}
                          </a>
                        )}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right  absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/myprofile"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              โปรไฟล์
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/myreservation"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              การจอง
                            </a>
                          )}
                        </Menu.Item>

                        <Menu.Item>
                          {({ active }) => (
                            <a
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                              onClick={() => {
                                userStore.logout();
                                history.push("/");
                              }}
                            >
                              ออกจากระบบ
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-black"
                      : "text-black hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
});
export default Navbar;
